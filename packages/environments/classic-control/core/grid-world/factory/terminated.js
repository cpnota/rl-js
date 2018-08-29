const { g } = require('./features');

module.exports = layout => (state, action, nextState, time) => layout[nextState.y][nextState.x] === g || time > 200;
