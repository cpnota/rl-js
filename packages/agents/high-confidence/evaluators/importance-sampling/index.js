const math = require('@rl-js/math');

const importanceSampling = ({ trajectories, policy, gamma = 1 }) => (
  trajectories.map((trajectory) => {
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

    return importanceWeight * returns;
  }));

const weightedImportanceSampling = ({ trajectories, policy, gamma = 1 }) => {
  let importanceWeightSum = 0;

  return trajectories.map((trajectory) => {
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

    importanceWeightSum += importanceWeight;
    return importanceWeight * returns;
  }).map(weightedReturns => weightedReturns * trajectories.length / importanceWeightSum);
};

const perDecisionImportanceSampling = ({ trajectories, policy, gamma = 1 }) => {
  const maxTrajectoryLength = math.stats.max(trajectories.map(trajectory => trajectory.length));
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
  const maxTrajectoryLength = math.stats.max(trajectories.map(trajectory => trajectory.length));
  const importanceWeights = new Array(trajectories.length).fill(1);

  let result = trajectories.map();
  let discountFactor = 1;

  for (let t = 0; t < maxTrajectoryLength; t += 1) {
    trajectories.forEach((trajectory, i) => {
      if (t < trajectory.length) {
        const { state, action, probability } = trajectory[t];
        importanceWeights[i] *= policy.probability(state, action) / probability;
      }
    });

    const importanceWeightSum = math.stats.sum(importanceWeights);

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
  // weightedImportanceSampling,
  // perDecisionImportanceSampling,
  // weightedPerDecisionImportanceSampling,
  // ...require('./td'),
  // ...require('./residual'),
};
