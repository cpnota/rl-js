const math = require('mathjs');

module.exports = ({
  policy,
  environmentFactory,
  trials,
  horizon,
}) => {
  const scores = new Array(trials).fill().map(() => {
    const environment = environmentFactory.createEnvironment();
    let returns = 0;
    for (let t = 0; t < horizon && !environment.isTerminated(); t += 1) {
      const state = environment.getObservation();
      const action = policy.chooseAction(state);
      environment.dispatch(action);
      returns += environment.getReward();
    }
    return returns;
  });

  return math.mean(scores);
};
