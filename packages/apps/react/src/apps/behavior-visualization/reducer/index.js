import * as types from '../action-types';

const defaultState = {
  key: 'value',
  agent: undefined,
  environment: undefined,
  hyperparameters: {},
  step: 0,
  results: [],
  errors: 0,
  environmentState: undefined,
  returns: 0,
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
        results: state.results.concat([action.payload]),
      };
    case types.RECORD_TRIAL_ERROR:
      return {
        ...state,
        errors: state.errors + 1,
      };
    case types.SET_ENVIRONMENT_STATE:
      return {
        ...state,
        environmentState: action.payload.environment,
        returns: action.payload.terminated ? 0 : state.returns + action.payload.reward,
        results: action.payload.terminated
          ? state.results.concat(state.returns + action.payload.reward)
          : state.results,
      };
    default:
      return state;
  }
};

export default learningCurve;
