const types = require('./types');

// generic gridworld reducer
module.exports = (canMoveTo, initialState = { x: 0, y: 0 }) => (
  state = initialState,
  action,
) => {
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

  return canMoveTo(next) ? next : state;
};
