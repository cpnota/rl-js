const optimizeResidual = ({ trajectories, v, policy }) => {
  trajectories.forEach((history) => {
    for (let t = 0; t < history.length; t += 1) {
      const {
        reward, state, action, probability,
      } = history[t];
      let tdError;
      // let gradient;
      if (t === history.length - 1) {
        tdError = reward - v.call(state);
        // gradient = v.gradient(state);
      } else {
        const nextState = history[t + 1].state;
        tdError = reward + v.call(nextState) - v.call(state);
        // gradient = v.gradient(state);
        // gradient = math.subtract(v.gradient(state), v.gradient(nextState));
      }
      const weightedTdError = tdError * policy.probability(state, action) / probability;
      v.update(state, weightedTdError);
      // v.updateParameters(math.multiply(weightedTdError, gradient));
    }
  });

  return v;
};

const computeTdErrors = ({ trajectories, v }) => {
  trajectories.forEach((history) => {
    for (let t = 0; t < history.length; t += 1) {
      const { reward, state } = history[t];
      let tdError;
      if (t === history.length - 1) {
        tdError = reward - v.call(state);
      } else {
        tdError = reward + v.call(history[t + 1].state) - v.call(state);
      }
      history[t].tdError = tdError; // eslint-disable-line
    }
  });
};

const residualImportanceSampling = ({
  trajectories, policy, v, gamma = 1,
}) => {
  const initialParameters = v.getParameters().map(i => i);
  v.setParameters(initialParameters.map((() => 0)));
  let result = 0;

  optimizeResidual({ trajectories, v, policy });
  computeTdErrors({ trajectories, v });

  trajectories.forEach((trajectory) => {
    let importanceWeight = 1;
    let returns = 0;
    let discountFactor = 1;

    trajectory.forEach(({
      state,
      action,
      tdError,
      probability,
    }) => {
      importanceWeight *= policy.probability(state, action) / probability;
      returns += discountFactor * tdError;
      discountFactor *= gamma;
    });

    result += importanceWeight * returns + v.call(trajectory[0].state);
  });

  v.setParameters(initialParameters);
  return result / trajectories.length;
};

const safeResidualImportanceSampling = ({
  trajectories, policy, v, gamma = 1,
}) => {
  const initialParameters = v.getParameters().map(i => i);
  v.setParameters(initialParameters.map((() => 0)));
  let result = 0;

  const train = trajectories.slice(0, trajectories.length / 4);
  const test = trajectories.slice(trajectories.length / 4);

  optimizeResidual({ trajectories: train, v, policy });
  computeTdErrors({ trajectories: test, v });

  test.forEach((trajectory) => {
    let importanceWeight = 1;
    let returns = 0;
    let discountFactor = 1;

    trajectory.forEach(({
      state,
      action,
      tdError,
      probability,
    }) => {
      importanceWeight *= policy.probability(state, action) / probability;
      returns += discountFactor * tdError;
      discountFactor *= gamma;
    });

    result += importanceWeight * returns + v.call(trajectory[0].state);
  });

  v.setParameters(initialParameters);
  return result / test.length;
};

module.exports = {
  residualImportanceSampling,
  safeResidualImportanceSampling,
};
