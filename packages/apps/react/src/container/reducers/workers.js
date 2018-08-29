import * as types from '../action-types';

const workersReducer = (state = [], action) => {
  switch (action.type) {
    case types.INITIALIZE_WORKERS:
      return action.payload.ids;
    default:
      return state;
  }
};

export default workersReducer;
