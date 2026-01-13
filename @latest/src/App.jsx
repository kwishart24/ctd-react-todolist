import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  //const url = `https://api.airtable.com/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  //const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const token = `Bearer ${String(import.meta.env.VITE_PAT).trim()}`;

  //console.log(import.meta.env.VITE_PAT);
  // console.log(import.meta.env.VITE_BASE_ID);
  // console.log(import.meta.env.VITE_TABLE_NAME);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'http://localhost:5173/',
        },
      };

      try {
        const resp = await fetch(url, options);

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

        setTodoList(todos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    setIsSaving(true);
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
      const resp = await fetch(url, options);

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

      setTodoList((prev) => [...prev, savedTodo]);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (id) => {
    setIsSaving(true);

    const originalTodo = todoList.find((todo) => todo.id === id);

    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
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
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      // Revert UI if fail
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === originalTodo.id ? originalTodo : todo
        )
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    setIsSaving(true);

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    // Optimistically update UI immediately
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );

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
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      // Revert UI
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === originalTodo.id ? originalTodo : todo
        )
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
      />
      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
