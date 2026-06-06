import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import root from './reducer';
import { handleMessage } from './actions';
import configureSagas from './sagas';

/* eslint-disable no-underscore-dangle */
const configureStore = (registerHandler) => {
  const sagaMiddleware = createSagaMiddleware();
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'Visualizer' });
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    devTools || (value => value),
  );
  const store = createStore(
    root,
    enhancer,
  );
  registerHandler(message => store.dispatch(handleMessage(message)));
  configureSagas(store, sagaMiddleware);
  return store;
};

export default configureStore;
