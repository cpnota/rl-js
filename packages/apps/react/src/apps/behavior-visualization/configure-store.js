import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import root from './reducer';
import { handleMessage } from './actions';
import configureSagas from './sagas';

/* eslint-disable no-underscore-dangle */
const configureStore = (registerHandler) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    root,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'Learning Curve' }),
    applyMiddleware(sagaMiddleware),
  );
  registerHandler(message => store.dispatch(handleMessage(message)));
  configureSagas(store, sagaMiddleware);
  return store;
};

export default configureStore;
