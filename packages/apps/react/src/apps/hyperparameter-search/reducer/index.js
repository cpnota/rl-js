import { combineReducers } from 'redux';
import results from './results';
import config from './config';

const rootReducer = combineReducers({
  config,
  results,
});

export default rootReducer;
