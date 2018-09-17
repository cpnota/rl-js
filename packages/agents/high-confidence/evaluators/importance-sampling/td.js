const math = require('mathjs');

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

const tdImportanceSampling = ({
  trajectories, policy, v, gamma = 1,
}) => {
  let result = 0;

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

  return result / trajectories.length;
};

const perDecisionTdImportanceSampling = ({
  trajectories, policy, v, gamma = 1,
}) => {
  let result = 0;
  let discountFactor = 1;

  computeTdErrors({ trajectories, v });

  const maxTrajectoryLength = math.max(trajectories.map(trajectory => trajectory.length));
  const importanceWeights = new Array(trajectories.length).fill(1);

  trajectories.forEach((trajectory) => {
    result += v.call(trajectory[0].state);
  });

  for (let t = 0; t < maxTrajectoryLength; t += 1) {
    trajectories.forEach((trajectory, i) => {
      if (t < trajectory.length) {
        const { state, action, probability } = trajectory[t];
        importanceWeights[i] *= policy.probability(state, action) / probability;
      }
    });

    /* eslint-disable no-loop-func */
    trajectories.forEach((trajectory, i) => {
      if (t < trajectory.length) {
        const { tdError } = trajectory[t];
        result += discountFactor * importanceWeights[i] * tdError;
      }
    });

    discountFactor *= gamma;
  }

  return result / trajectories.length;
};

const weightedPerDecisionTdImportanceSampling = ({
  trajectories, policy, v, gamma = 1,
}) => {
  computeTdErrors({ trajectories, v });

  const maxTrajectoryLength = math.max(trajectories.map(trajectory => trajectory.length));
  const importanceWeights = new Array(trajectories.length).fill(1);

  let result = 0;
  let discountFactor = 1;

  trajectories.forEach((trajectory) => {
    result += v.call(trajectory[0].state) / trajectories.length;
  });

  for (let t = 0; t < maxTrajectoryLength; t += 1) {
    trajectories.forEach((trajectory, i) => {
      if (t < trajectory.length) {
        const { state, action, probability } = trajectory[t];
        importanceWeights[i] *= policy.probability(state, action) / probability;
      }
    });

    const importanceWeightSum = math.sum(importanceWeights);

    /* eslint-disable no-loop-func */
    trajectories.forEach((trajectory, i) => {
      if (t < trajectory.length) {
        const { tdError } = trajectory[t];
        result += discountFactor * importanceWeights[i] * tdError / importanceWeightSum;
      }
    });

    discountFactor *= gamma;
  }

  return result;
};

module.exports = {
  tdImportanceSampling,
  perDecisionTdImportanceSampling,
  weightedPerDecisionTdImportanceSampling,
};
