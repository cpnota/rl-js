import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import root from './reducers';
import {
  registerWorker, instansiateWorkers, runTaskSaga, runTasksSaga, handleResponseSaga,
} from './sagas';
import { initializeWorkers } from './actions/apps';

/* eslint-disable no-underscore-dangle */
const configureStore = ({ worker }) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    root,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'rl-js' }),
    applyMiddleware(sagaMiddleware),
  );

  registerWorker(worker);
  sagaMiddleware.run(instansiateWorkers);
  sagaMiddleware.run(runTaskSaga);
  sagaMiddleware.run(runTasksSaga);
  sagaMiddleware.run(handleResponseSaga);
  store.dispatch(initializeWorkers(5)); // TODO configurable thread limit

  return store;
};

export default configureStore;
