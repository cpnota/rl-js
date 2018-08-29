module.exports = ({ waterPenalty, goalReward }) => {
  const w = waterPenalty;
  const g = goalReward;

  const rewards = {
    0: [w, 0, w, g, w],
    1: [w, 0, w, 0, w],
    2: [w, 0, 0, 0, w],
    3: [w, w, w, w, w],
    4: [w, w, w, w, w],
  };

  return (state, action, nextState) => rewards[nextState.y][nextState.x];
};
