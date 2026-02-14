import TodosViewForm from '../features/TodosViewForm';
import TodoList from '../features/TodoList/TodoList.jsx';
import TodoForm from '../features/TodoForm';

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

  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        //setTodoList={setTodoList}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
      />
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
}

export default TodosPage;
