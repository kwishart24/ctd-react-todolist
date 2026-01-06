import { useState, useRef } from 'react';

function TodoForm(props) {
  const { onAddTodo } = props;
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
        <label htmlFor="todoTitle">Todo</label>
        <input
          ref={todoTitleInput}
          type="text"
          id="todoTitle"
          name="title"
          value={workingTodoTitle}
          onChange={(event) => {setWorkingTodo(event.target.value)}}
        ></input>
        <>
        {workingTodoTitle === '' ? (<button disabled={true} >Add Todo</button>) : (<button disabled={false}>Add Todo</button>)}
        </>
      </form>
    </div>
  );
}

export default TodoForm;
