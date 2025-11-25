function TodoForm() {
    return (
        <div>
            <form htmlFor = "todoTitle">
                <label>Todo</label>
                <input type="text" id="todoTitle"></input>

                <button>Add Todo</button>
            </form>
        </div>
    )
}

export default TodoForm