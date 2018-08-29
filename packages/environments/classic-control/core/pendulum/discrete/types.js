const range = [-10, 0, 10]; // this might be too easy
const actions = {};
range.forEach(val => (actions[val] = val));
module.exports = actions;
