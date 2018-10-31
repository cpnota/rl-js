import * as types from '../action-types';

export const selectAgent = agent => ({
  type: types.SELECT_AGENT,
  payload: agent,
});

export const selectEnvironment = environment => ({
  type: types.SELECT_ENVIRONMENT,
  payload: environment,
});

export const setHyperparameter = (name, value) => ({
  type: types.SET_HYPERPARAMETER,
  payload: {
    name,
    value,
  },
});

export const setEpisodes = episodes => ({
  type: types.SET_EPISODES,
  payload: episodes,
});

export const setTrials = trials => ({
  type: types.SET_TRIALS,
  payload: trials,
});

export const stepForward = () => ({
  type: types.STEP_FORWARD,
});

export const stepBackward = () => ({
  type: types.STEP_BACKWARD,
});

export const recordTrial = result => ({
  type: types.RECORD_TRIAL,
  payload: result,
});

export const recordTrialError = (message) => {
  /* eslint-disable no-console */
  console.debug('Error occured during trial');
  console.debug(message.payload.task);
  console.debug(message.payload.error);

  return ({
    type: types.RECORD_TRIAL_ERROR,
  });
};

export const handleMessage = (message) => {
  if (message.payload.task.type === 'hcpi') {
    return message.error ? recordTrialError(message) : recordTrial(message.payload.result);
  }

  return {
    type: types.UNKNOWN_MESSAGE,
    payload: message,
  };
};
