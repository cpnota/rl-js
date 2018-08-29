import { createStore } from 'redux';
import root from './reducer';
import { handleMessage } from './actions';

/* eslint-disable no-underscore-dangle */
const configureStore = (registerHandler) => {
  const store = createStore(
    root,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'Hyperparameter Search' }),
  );
  registerHandler(message => store.dispatch(handleMessage(message)));
  return store;
};

export default configureStore;
