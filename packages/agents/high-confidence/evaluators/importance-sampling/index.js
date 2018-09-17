const math = require('mathjs');

const importanceSampling = ({ trajectories, policy, gamma = 1 }) => {
  let result = 0;

  trajectories.forEach((trajectory) => {
    let importanceWeight = 1;
    let returns = 0;
    let discountFactor = 1;

    trajectory.forEach(({
      state,
      action,
      reward,
      probability,
    }) => {
      importanceWeight *= policy.probability(state, action) / probability;
      returns += discountFactor * reward;
      discountFactor *= gamma;
    });

    result += importanceWeight * returns;
  });

  return result / trajectories.length;
};

const weightedImportanceSampling = ({ trajectories, policy, gamma = 1 }) => {
  let result = 0;
  let importanceWeightSum = 0;

  trajectories.forEach((trajectory) => {
    let importanceWeight = 1;
    let returns = 0;
    let discountFactor = 1;

    trajectory.forEach(({
      state,
      action,
      reward,
      probability,
    }) => {
      importanceWeight *= policy.probability(state, action) / probability;
      returns += discountFactor * reward;
      discountFactor *= gamma;
    });

    result += importanceWeight * returns;
    importanceWeightSum += importanceWeight;
  });

  return result / importanceWeightSum;
};

const perDecisionImportanceSampling = ({ trajectories, policy, gamma = 1 }) => {
  const maxTrajectoryLength = math.max(trajectories.map(trajectory => trajectory.length));
  const importanceWeights = new Array(trajectories.length).fill(1);

  let result = 0;
  let discountFactor = 1;

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
        const { reward } = trajectory[t];
        result += discountFactor * importanceWeights[i] * reward;
      }
    });

    discountFactor *= gamma;
  }

  return result / trajectories.length;
};

const weightedPerDecisionImportanceSampling = ({ trajectories, policy, gamma = 1 }) => {
  const maxTrajectoryLength = math.max(trajectories.map(trajectory => trajectory.length));
  const importanceWeights = new Array(trajectories.length).fill(1);

  let result = 0;
  let discountFactor = 1;

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
        const { reward } = trajectory[t];
        result += discountFactor * importanceWeights[i] * reward / importanceWeightSum;
      }
    });

    discountFactor *= gamma;
  }

  return result;
};

module.exports = {
  importanceSampling,
  weightedImportanceSampling,
  perDecisionImportanceSampling,
  weightedPerDecisionImportanceSampling,
  ...require('./td'),
  ...require('./residual'),
};
