import * as types from '../action-types';

const queueTasks = (state, tasks) => ({
  ...state,
  tasks: (state.tasks || []).concat(tasks),
});

const moveTaskToThread = (state, action) => {
  const index = state.tasks.findIndex(t => t.id === action.payload.task.id);
  const tasks = state.tasks.slice(0, index).concat(state.tasks.slice(index + 1));
  return {
    ...state,
    tasks,
    threads: {
      ...state.threads,
      [action.payload.thread]: action.payload.task,
    },
  };
};

const clearThread = (state, thread) => ({
  ...state,
  threads: {
    ...state.threads,
    [thread]: undefined,
  },
});

const appsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_APP:
      return {
        ...state,
        [action.payload.id]: {
          name: action.payload.type,
          type: action.payload.type,
          id: action.payload.id,
          threads: {},
          tasks: [],
        },
      };
    case types.CLOSE_APP:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          tasks: [],
          closed: true,
        },
      };
    case types.QUEUE_TASKS:
      return {
        ...state,
        [action.payload.app]: queueTasks(state[action.payload.app], action.payload.tasks),
      };
    case types.RUN_TASK:
      return {
        ...state,
        [action.payload.app]: moveTaskToThread(state[action.payload.app], action),
      };
    case types.TASK_SUCCEEDED:
    case types.TASK_FAILED:
      return {
        ...state,
        [action.payload.app]: clearThread(state[action.payload.app], action.payload.thread),
      };
    default:
      return state;
  }
};

export default appsReducer;
