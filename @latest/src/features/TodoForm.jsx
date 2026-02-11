import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { StyledTodoForm } from './StyledTodoForm';

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
    <StyledTodoForm>
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
    </StyledTodoForm>
  );
}

export default TodoForm;
