module.exports = ({
  policy,
  environmentFactory,
  trials,
  horizon,
}) => (
  new Array(trials).fill().map(() => {
    const environment = environmentFactory.createEnvironment();
    const history = [];
    for (let t = 0; t < horizon && !environment.isTerminated(); t += 1) {
      const state = environment.getObservation();
      const action = policy.chooseAction(state);
      const probability = policy.probability(state, action);
      environment.dispatch(action);
      const reward = environment.getReward();
      history.push({
        state,
        action,
        reward,
        probability,
      });
    }
    return history;
  })
);
