const initialState = {
  environment: undefined,
  time: -1,
  reward: 0,
  terminated: false,
};

module.exports = (environmentReducer, computeReward, isTerminated) => (
  state = initialState,
  resolvedAction,
) => {
  const nextEnvironmentState = environmentReducer(
    state.environment,
    resolvedAction,
  );

  return {
    environment: nextEnvironmentState,
    time: state.time + 1,
    reward: computeReward(
      state.environment,
      resolvedAction,
      nextEnvironmentState,
    ),
    terminated: isTerminated(
      state.environment,
      resolvedAction,
      nextEnvironmentState,
      state.time + 1,
    ),
  };
};
