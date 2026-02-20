import TodosViewForm from '../features/TodosViewForm';
import TodoList from '../features/TodoList/TodoList.jsx';
import TodoForm from '../features/TodoForm';
import styles from './TodosPage.module.css';
import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';

function TodosPage({
  addTodo,
  todoState,
  updateTodo,
  completeTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const { todoList, isSaving, isLoading } = todoState;

  //Todo List Pagination
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 15;

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const filteredTodoList = todoList;

  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

  function handlePreviousPage() {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  }

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      <div className={styles.todosContainer}>
        <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
        <TodoList
          todoList={currentTodos}
          //setTodoList={setTodoList}
          onUpdateTodo={updateTodo}
          isLoading={isLoading}
          onCompleteTodo={completeTodo}
        />
        <div className={styles.paginationControls}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <hr />
        <TodosViewForm
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          sortField={sortField}
          setSortField={setSortField}
          queryString={queryString}
          setQueryString={setQueryString}
        />
      </div>
    </>
  );
}

export default TodosPage;
