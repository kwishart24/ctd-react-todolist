import { useRef } from 'react';

function TodoForm(props) {
  const { onAddTodo } = props;
  const todoTitleInput = useRef(document.getElementById(''));

  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
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
        ></input>

        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default TodoForm;
