function TodoListItem({ todo }) {
  return (
  <li>
    {todo.title}
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
