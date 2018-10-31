import * as types from '../action-types';

const defaultState = {
  key: 'value',
  agent: undefined,
  environment: undefined,
  hyperparameters: {},
  step: 0,
  // results: [],
  improvements: 0,
  successes: 0,
  trials: 0,
  errors: 0,
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
    case types.SET_HYPERPARAMETER:
      return {
        ...state,
        hyperparameters: {
          ...state.hyperparameters,
          [action.payload.name]: action.payload.value,
        },
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
    case types.RECORD_TRIAL:
      return {
        ...state,
        improvements: action.payload ? state.improvements + 1 : state.improvements,
        successes: state.successes + 1,
      };
    case types.RECORD_TRIAL_ERROR:
      return {
        ...state,
        errors: state.errors + 1,
      };
    default:
      return state;
  }
};

export default learningCurve;
