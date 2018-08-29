import { combineReducers } from 'redux';
import navigation from './navigation';
import apps from './apps';
import workers from './workers';

const root = combineReducers({
  navigation,
  apps,
  workers,
});

export default root;
