const _get = require('lodash.get');
const types = require('../types');
const { s } = require('./features');

// generic gridworld reducer
module.exports = (layout) => {
  const initialState = {
    x: 0,
    y: 0,
  };

  layout.forEach((row, y) => row.forEach((square, x) => {
    if (square === s) {
      initialState.x = x;
      initialState.y = y;
    }
  }));

  const canMoveTo = next => _get(layout, [next.y, next.x]) != null;

  return (state = initialState, action) => {
    const { x, y } = state;
    let next;

    switch (action.type) {
      case types.LEFT:
        next = { x: x - 1, y };
        break;
      case types.RIGHT:
        next = { x: x + 1, y };
        break;
      case types.UP:
        next = { x, y: y - 1 };
        break;
      case types.DOWN:
        next = { x, y: y + 1 };
        break;
      default:
        return state;
    }

    const canMove = canMoveTo(next);
    return canMove ? next : state;
  };
};
