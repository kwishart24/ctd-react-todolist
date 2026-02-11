import { useReducer } from 'react';

const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
};

let initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetchTodos':
      return { ...state, isLoading: true };
    case 'loadTodos':
      const todos = action.records.map((record) => {
        const todo = {
          id: record.id,
          title: record.fields.title || '',
          isCompleted: record.fields.isCompleted || false,
        };
        return todo;
      });
      return { ...state, todoList: [...list], isLoading: false };
    case 'setLoadError':
      return { ...state, errorMessage: action.errorMessage, isLoading: false };
    case 'startRequest':
      return { ...state, isSaving: true };
    case 'addTodo':
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: { ...action.todoList, savedTodo },
        isSaving: false,
      };
    case 'endRequest':
      return { ...state, isSaving: false, isLoading: false };
    case 'updateTodo':
      return {};
    case 'completeTodo':
      return {};
    case 'revertTodo':
      return {};
    case 'clearError':
      return {};
  }
}

export { actions, initialState, reducer };
