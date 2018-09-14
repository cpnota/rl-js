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

module.exports = {
  importanceSampling,
};
