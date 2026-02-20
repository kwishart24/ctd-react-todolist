import { useState, useEffect, useCallback, useReducer } from 'react';
import './App.css';
import styles from './App.module.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';
import {
  actions as todoActions,
  reducer as todosReducer,
  initialState as initialTodosState,
} from './reducers/todos.reducer.js';
import TodosPage from './pages/TodosPage.jsx';
import Header from './shared/Header.jsx';
import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router';
import AboutPage from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

//const baseUrl = 'https://api.airtable.com/';

function App() {
  // const [todoList, setTodoList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [isSaving, setIsSaving] = useState(false);

  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const location = useLocation();

  const [title, setTitle] = useState('');

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const { todoList, isLoading, isSaving, errorMessage } = todoState;

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    let searchQuery = '';

    const trimmed = queryString.trim();

    if (trimmed.length > 0) {
      const formula = `SEARCH("${trimmed}", {title})`;
      searchQuery = `&filterByFormula=${encodeURIComponent(formula)}`;
    }

    return `${url}?${sortQuery}${searchQuery}`;
  }, [sortField, sortDirection, queryString]);

  //const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${String(import.meta.env.VITE_PAT).trim()}`;

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Todo List');
        break;

      case '/about':
        setTitle('About');
        break;

      default:
        setTitle('Not Found');
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchTodos = async () => {
      // setIsLoading(true);
      dispatch({ type: todoActions.fetchTodos });

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'http://localhost:5173/',
        },
      };

      try {
        const resp = await fetch(encodeUrl(), options);

        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        const data = await resp.json();

        const todos = data.records.map((record) => {
          const todo = {
            id: record.id,
            title: record.fields.title || '',
            isCompleted: record.fields.isCompleted || false,
          };
          return todo;
        });

        //setTodoList(todos);
        dispatch({ type: todoActions.loadTodos, todos });
      } catch (error) {
        // setErrorMessage(error.message);
        dispatch({
          type: todoActions.setLoadError,
          errorMessage: error.message,
        });
      } finally {
        //setIsLoading(false);
        dispatch({ type: todoActions.endRequest });
      }
    };

    fetchTodos();
  }, [encodeUrl, token]);

  const addTodo = async (title) => {
    //setIsSaving(true);
    dispatch({ type: todoActions.startRequest });

    const payload = {
      records: [
        {
          fields: {
            title: title,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();

      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      //setTodoList((prev) => [...prev, savedTodo]);
      dispatch({
        type: todoActions.addTodo,
        todo: savedTodo,
      });
    } catch (error) {
      console.error(error);
      // setErrorMessage(error.message);
      dispatch({
        type: todoActions.setLoadError,
        errorMessage: error.message,
      });
    } finally {
      //setIsSaving(false);
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    //setIsSaving(true);
    dispatch({ type: todoActions.startRequest });

    const originalTodo = todoList.find((todo) => todo.id === id);

    //Optimistic Update
    dispatch({ type: todoActions.completeTodo, id });

    // setTodoList((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo.id === id ? { ...todo, isCompleted: true } : todo
    //   )
    // );

    const payload = {
      records: [
        {
          id,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.error(error);
      //setErrorMessage(`${error.message}. Reverting todo...`);
      dispatch({
        type: todoActions.setLoadError,
        errorMessage: `${error.message}. Reverting todo...`,
      });

      // Revert UI if fail
      dispatch({
        type: todoActions.revertTodo,
        originalTodo,
      });

      // setTodoList((prevTodos) =>
      //   prevTodos.map((todo) =>
      //     todo.id === originalTodo.id ? originalTodo : todo
      //   )
      // );
    } finally {
      //setIsSaving(false);
      dispatch({ type: todoActions.endRequest });
    }
  };

  const updateTodo = async (editedTodo) => {
    //setIsSaving(true);
    dispatch({ type: todoActions.startRequest });

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    // Optimistically update UI immediately
    dispatch({
      type: todoActions.updateTodo,
      todo: editedTodo,
    });

    // setTodoList((prevTodos) =>
    //   prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    // );

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.error(error);
      // setErrorMessage(`${error.message}. Reverting todo...`);
      dispatch({
        type: todoActions.setLoadError,
        errorMessage: `${error.message}. Reverting todo...`,
      });

      // Revert UI
      // setTodoList((prevTodos) =>
      //   prevTodos.map((todo) =>
      //     todo.id === originalTodo.id ? originalTodo : todo
      //   )
      // );

      dispatch({
        type: todoActions.revertTodo,
        originalTodo,
      });
    } finally {
      //setIsSaving(false);
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              addTodo={addTodo}
              todoState={todoState}
              todoList={todoList}
              updateTodo={updateTodo}
              completeTodo={completeTodo}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              sortField={sortField}
              setSortField={setSortField}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          }
        ></Route>
        <Route
          path="/about"
          element={<AboutPage />}
          className={styles.about}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {errorMessage && (
        <div className={styles.errorDiv}>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
