import { SET_ACTIVE_TAB } from '../action-types';

export const setActiveTab = tab => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});
