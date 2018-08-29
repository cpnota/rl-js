const { w, g } = require('./features');

module.exports = ({
  layout, waterPenalty, goalReward, timePenalty,
}) => {
  const rewardTypes = {
    [w]: waterPenalty,
    [g]: goalReward,
  };

  const rewards = layout.map(rows => rows.map(tile => rewardTypes[tile] || 0));
  return (state, action, nextState) => rewards[nextState.y][nextState.x] + timePenalty;
};
