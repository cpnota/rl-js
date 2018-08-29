const math = require('mathjs');
const rungeKutta4 = require('./runge-kutta-4');
const configureDynamics = require('./dynamics');

const wrap = (min, max) => (x) => {
  let result = x;
  const diff = max - min;
  while (result > max) result -= diff;
  while (result < min) result += diff;
  return result;
};

const bound = (min, max) => x => Math.min(Math.max(x, min), max);

module.exports = (params) => {
  const { dt } = params;
  const dynamics = configureDynamics(params);
  const approximate = rungeKutta4(dynamics);

  const createInitialState = () => new Array(4).fill(0).map(() => math.random(-0.1, 0.1));

  const wrapTheta = wrap(-Math.PI, Math.PI);
  const boundVel1 = bound(-params.maxVel1, params.maxVel1);
  const boundVel2 = bound(-params.maxVel2, params.maxVel2);

  return (state, action) => {
    if (state === undefined) {
      return createInitialState();
    }

    if (action.type === 'torque') {
      const torque = action.payload;
      const nextState = approximate(state, torque, dt);
      return [
        wrapTheta(nextState[0]),
        wrapTheta(nextState[1]),
        boundVel1(nextState[2]),
        boundVel2(nextState[3]),
      ];
    }

    return state;
  };
};
