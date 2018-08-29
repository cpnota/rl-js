const thetaFailureThreshold = Math.PI / 12; //* 2 * Math.PI / 360
const xFailureThreshold = 2.4;

module.exports = (state, action, nextState, time) => (
  Math.abs(nextState.x) > xFailureThreshold
    || Math.abs(nextState.theta) > thetaFailureThreshold
    || time > 20 / 0.02 // TODO
);
