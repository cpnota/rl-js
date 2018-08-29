const types = require('./types');

module.exports = (state, action, nextState) => action.type === types.left || nextState === 10;
