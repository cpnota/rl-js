module.exports = ({ dt }) => (state, action, nextState, time) => time >= 20 / dt || Math.abs(nextState.theta) > 12 * Math.PI;
