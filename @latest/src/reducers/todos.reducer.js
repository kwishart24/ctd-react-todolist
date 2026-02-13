const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  setLoadError: 'setLoadError',
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  revertTodo: 'revertTodo',
  clearError: 'clearError',
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

function reducer(state, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return { ...state, isLoading: true };

    case actions.loadTodos:
      return {
        ...state,
        todoList: action.todos,
        isLoading: false,
        errorMessage: '',
      };

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };

    case actions.startRequest:
      return { ...state, isSaving: true };

    case actions.addTodo:
      return {
        ...state,
        todoList: [...state.todoList, action.todo],
        isSaving: false,
      };

    case actions.updateTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      };

    case actions.completeTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, isCompleted: true } : todo
        ),
      };

    case actions.revertTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.originalTodo.id ? action.originalTodo : todo
        ),
      };

    case actions.endRequest:
      return { ...state, isSaving: false };

    case actions.clearError:
      return { ...state, errorMessage: '' };

    default:
      return state;
  }
}

export { actions, initialState, reducer };
