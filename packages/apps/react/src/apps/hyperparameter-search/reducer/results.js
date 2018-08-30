import math from 'mathjs';
import * as types from '../action-types';

const defaultState = {
  byMean: [],
  hyperparameters: {},
  tasks: 0,
  completed: 0,
  diverged: 0,
};

const defaultResult = {
  mean: undefined,
  hyperparameters: undefined,
  count: 0,
  divergences: 0,
};

const forHyperparameter = (state = defaultResult, action) => {
  switch (action.type) {
    case types.RECORD_TRIAL:
      return {
        ...state,
        mean: ((state.mean || 0)
          * (state.count) + math.mean(action.payload.result)) / (state.count + 1),
        count: state.count + 1,
        hyperparameters: state.hyperparameters || action.payload.hyperparameters,
      };
    case types.RECORD_TRIAL_ERROR:
      return {
        ...state,
        divergences: state.divergences + 1,
        hyperparameters: state.hyperparameters || action.payload.hyperparameters,
      };
    default:
      return state;
  }
};

const byHyperparameters = (state = {}, action) => {
  const key = JSON.stringify(action.payload.hyperparameters);
  return {
    ...state,
    [key]: forHyperparameter(state[key], action),
  };
};

const remove = (state, key) => {
  const index = state.findIndex(([hyperparameters]) => hyperparameters === key);
  return index === -1 ? state : [...state.slice(0, index), ...state.slice(index + 1)];
};

const insert = (state, key, results) => {
  const { mean } = results;
  const splitIndex = state.findIndex(([, { mean: m }]) => mean > m);
  if (splitIndex === -1) return [...state, [key, results]];
  return [...state.slice(0, splitIndex), [key, results], ...state.slice(splitIndex)];
};

const byMean = (state = [], action, key, results) => {
  switch (action.type) {
    case types.RECORD_TRIAL:
    case types.RECORD_TRIAL_ERROR:
      return insert(remove(state, key), key, results);
    default:
      return state;
  }
};

const results = (state = defaultState, action) => {
  switch (action.type) {
    case types.RECORD_TRIAL:
    case types.RECORD_TRIAL_ERROR: {
      const key = JSON.stringify(action.payload.hyperparameters);
      const newByHyperparameters = byHyperparameters(state.byHyperparameters, action);
      return {
        ...state,
        completed: action.type === types.RECORD_TRIAL ? state.completed + 1 : state.completed,
        diverged: action.type === types.RECORD_TRIAL_ERROR ? state.diverged + 1 : state.diverged,
        byHyperparameters: newByHyperparameters,
        byMean: byMean(state.byMean, action, key, newByHyperparameters[key]),
      };
    }
    case types.BEGIN_SEARCH: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    default:
      return state;
  }
};

export default results;
