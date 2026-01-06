import TodoListItem from './TodoListItem.jsx';
import { useState } from 'react';

function TodoList({ todoList, setTodoList }) {
  // const { todoList } = props;

  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: true,
        };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  //ternary statement todoList.length === 0 ? <p>Add todo above to get started</> : mapped unordered mapped todo list

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={completeTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
