import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      <form>
        {isEditing ? (
          <TextInputWithLabel value={todo.title} />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
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
