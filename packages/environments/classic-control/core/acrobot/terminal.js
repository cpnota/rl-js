module.exports = params => (state, action, nextState, time) => {
  const [theta1, theta2] = nextState;
  return (
    -Math.cos(theta1) - Math.cos(theta1 + theta2) > 1.0
    || time >= params.timeoutSeconds / params.dt
  );
};
