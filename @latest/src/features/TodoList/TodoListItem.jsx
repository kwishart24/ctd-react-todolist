import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  const handleCancel = (event) => {
    event.preventDefault();
    // resets the workingTitle to todo.title
    setWorkingTitle(todo.title);
    //sets isEditing state value to false
    setIsEditing(false);
    //todoTitleInput.current.focus();
  };

  const handleEdit = (event) => {
    event.preventDefault();
    //uses the event.target.value to update the workingTitle state value
    setWorkingTitle(event.target.value);
  };

  const handleUpdate = (event) => {
    //if isEditing is false, return immediately to exit the function
    if (!isEditing) {
      return;
    }
    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            {/* cancel button */}
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
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
