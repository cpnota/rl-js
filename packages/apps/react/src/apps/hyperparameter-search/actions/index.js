import * as types from '../action-types';

export const selectAgent = agent => ({
  type: types.SELECT_AGENT,
  payload: agent,
});

export const selectEnvironment = environment => ({
  type: types.SELECT_ENVIRONMENT,
  payload: environment,
});

export const setHyperparameterRanges = definitions => ({
  type: types.SET_HYPERPARAMETER_RANGES,
  payload: definitions,
});

export const setEpisodes = episodes => ({
  type: types.SET_EPISODES,
  payload: episodes,
});

export const setTrials = trials => ({
  type: types.SET_TRIALS,
  payload: trials,
});

export const setSamples = samples => ({
  type: types.SET_SAMPLES,
  payload: samples,
});

export const stepForward = () => ({
  type: types.STEP_FORWARD,
});

export const stepBackward = () => ({
  type: types.STEP_BACKWARD,
});

export const setSearchType = type => ({
  type: types.SET_SEARCH_TYPE,
  payload: type,
});

// for grid search
export const setSteps = steps => ({
  type: types.SET_STEPS,
  payload: steps,
});

export const beginSearch = tasks => ({
  type: types.BEGIN_SEARCH,
  payload: tasks.length,
});

export const recordTrial = ({ result, task }) => ({
  type: types.RECORD_TRIAL,
  payload: {
    result,
    hyperparameters: task.payload.hyperparameters,
  },
});

export const recordTrialError = ({ task }) => ({
  type: types.RECORD_TRIAL_ERROR,
  payload: {
    hyperparameters: task.payload.hyperparameters,
  },
});


export const handleMessage = (message) => {
  if (message.payload.task.type === 'standard') {
    return message.error ? recordTrialError(message.payload) : recordTrial(message.payload);
  }

  return {
    type: types.UNKNOWN_MESSAGE,
    payload: message,
  };
};
