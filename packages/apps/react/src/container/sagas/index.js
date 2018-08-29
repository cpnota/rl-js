import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import * as types from '../action-types';
import * as appActions from '../actions/apps';
// import Api from '...'

const workers = {};
let worker;

export function registerWorker(workerConstructor) {
  worker = workerConstructor;
}

export function* instansiateWorkers() {
  yield takeEvery(types.INITIALIZE_WORKERS, function* instansiate(action) {
    action.payload.ids.forEach((id) => {
      workers[id] = worker();
      workers[id].dispatch({ type: 'log', payload: `hello from ${id}` });
    });

    yield;
  });
}

function* runTasks(action) {
  const app = yield select(root => root.apps[action.payload.app]);
  let nextTask = app.tasks[0];

  if (!nextTask) return;

  for (const thread in workers) { // eslint-disable-line no-restricted-syntax
    if (!app.threads[thread] && nextTask) {
      yield put(appActions.runTask({
        app: app.id,
        thread,
        task: nextTask,
      }));
      nextTask = yield select(root => root.apps[action.payload.app].tasks[0]);
    }
  }
}

export function* runTasksSaga() {
  yield takeEvery([types.QUEUE_TASKS, types.TASK_SUCCEEDED, types.TASK_FAILED], runTasks);
}

export function* runTaskSaga() {
  yield takeEvery(types.RUN_TASK, function* runTask(action) {
    const { thread, task } = action.payload;
    try {
      const response = yield call(workers[thread].dispatch, task);
      yield put(appActions.taskSucceded(action.payload, response));
    } catch (error) {
      yield put(appActions.taskFailed(action.payload, error));
    }
  });
}

export function* handleResponseSaga() {
  yield takeEvery([types.TASK_SUCCEEDED, types.TASK_FAILED], appActions.handleResponse);
}

// function* setupWorkers(action) {
//   action.payload.ids.forEach(id => workers[id] = worker());
// }

// export function* setupSaga() {
//   yield takeEvery(types.INITIALIZE_WORKERS, setupWorkers);
// }

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* queueTasks(action) {
//   try {
//     const { app, tasks } = action.payload;

//     // const user = yield call(Api.fetchUser, action.payload.userId);
//     // yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
//   } catch (e) {
//     // yield put({type: "USER_FETCH_FAILED", message: e.message});
//   }
// }

// export function* taskSaga() {
//   yield takeEvery(types.QUEUE_TASKS, queueTasks);
// }

// export default taskSaga;
