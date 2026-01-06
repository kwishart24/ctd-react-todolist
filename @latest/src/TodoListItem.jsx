function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <li>
      <form>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        ></input>
        {todo.title}
      </form>
    </li>
  );
}

// function ToDoListItem({ todo = [] }) {
//   return (
//     <ul>
//       {todo.map((item) => {
//         return <li key={item.id}>{item.baseName}</li>;
//       })}
//     </ul>
//   );
// }

export default TodoListItem;
