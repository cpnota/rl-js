import uuid from 'uuid/v4';
import * as types from '../action-types';

const handlers = {};

export const addApp = app => ({
  type: types.ADD_APP,
  payload: {
    id: uuid(),
    type: app.name,
  },
});

export const closeApp = id => ({
  type: types.CLOSE_APP,
  payload: id,
});

export const queueTasks = (app, tasks) => ({
  type: types.QUEUE_TASKS,
  payload: {
    app,
    tasks: tasks.map(task => ({
      ...task,
      id: task.id || uuid(),
    })),
  },
});

export const registerHandler = (app, handler) => {
  handlers[app] = handler;

  return {
    type: types.REGISTER_HANDLER,
    payload: app,
  };
};

export const handleResponse = (action) => {
  const handle = handlers[action.payload.app];
  if (handle) {
    handle(action);
  }
};


export const initializeWorkers = number => ({
  type: types.INITIALIZE_WORKERS,
  payload: {
    ids: new Array(number).fill(0).map(() => uuid()),
  },
});

export const runTask = ({ app, thread, task }) => ({
  type: types.RUN_TASK,
  payload: {
    app,
    thread,
    task,
  },
});

export const taskSucceded = ({
  app, thread, task,
}, result) => ({
  type: types.TASK_SUCCEEDED,
  payload: {
    app,
    thread,
    task,
    result,
  },
});

export const taskFailed = ({
  app, thread, task,
}, error) => ({
  type: types.TASK_FAILED,
  payload: {
    app,
    thread,
    task,
    error,
  },
  error: true,
});
