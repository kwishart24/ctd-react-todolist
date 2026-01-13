import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({onAddTodo, isSaving}) {
  const [workingTodoTitle, setWorkingTodo] = useState('');
  const todoTitleInput = useRef(document.getElementById(''));

  const handleAddTodo = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    onAddTodo(workingTodoTitle);
    // event.target.title.value = '';
    setWorkingTodo('');
    todoTitleInput.current.focus();
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          ref={todoTitleInput}
          value={workingTodoTitle}
          elementId="todoTitle"
          labelText="Todo"
          onChange={(event) => {
            setWorkingTodo(event.target.value);
          }}
        />
        <button disabled={workingTodoTitle.trim() === ''}>
          {isSaving ? 'Saving...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
