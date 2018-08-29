import * as types from '../action-types';

const defaultState = {
  key: 'value',
  agent: undefined,
  environment: undefined,
  searchType: 'grid',
  definitions: [],
  step: 0,
  steps: 5,
  samples: 100,
};

const learningCurve = (state = defaultState, action) => {
  switch (action.type) {
    case types.STEP_FORWARD:
      return {
        ...state,
        step: Math.min(state.step + 1, 4),
      };
    case types.STEP_BACKWARD:
      return {
        ...state,
        step: Math.max(state.step - 1, 0),
      };
    case types.SELECT_AGENT:
      return {
        ...state,
        agent: action.payload,
      };
    case types.SELECT_ENVIRONMENT:
      return {
        ...state,
        environment: action.payload,
      };
    case types.SET_HYPERPARAMETER_RANGES:
      return {
        ...state,
        definitions: action.payload,
      };
    case types.SET_EPISODES:
      return {
        ...state,
        episodes: action.payload,
      };
    case types.SET_TRIALS:
      return {
        ...state,
        trials: action.payload,
      };
    case types.SET_STEPS:
      return {
        ...state,
        steps: action.payload,
      };
    case types.SET_SAMPLES:
      return {
        ...state,
        samples: action.payload,
      };
    case types.SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };
    default:
      return state;
  }
};

export default learningCurve;
