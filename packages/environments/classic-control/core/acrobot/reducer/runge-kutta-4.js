const math = require('mathjs');

const getYOut = math.compile('y0 + dt / 6.0 * (k1 + 2 * k2 + 2 * k3 + k4)');

const rungeKutta4 = (derivs, y0, t) => {
  const yOut = [y0];

  for (let i = 0; i < t.length - 1; i++) {
    const thisT = t[i];
    const dt = t[i + 1] - thisT;
    const dt2 = dt / 2;
    y0 = yOut[i];

    const k1 = derivs(y0, thisT);
    const k2 = derivs(math.add(y0, math.multiply(dt2, k1)), thisT + dt2);
    const k3 = derivs(math.add(y0, math.multiply(dt2, k2)), thisT + dt2);
    const k4 = derivs(math.add(y0, math.multiply(dt, k3)), thisT + dt);
    const scope = {
      k1,
      k2,
      k3,
      k4,
      y0,
      dt,
    };

    yOut[i + 1] = getYOut.eval(scope);
  }

  return yOut;
};

const augmentState = (state, action) => state.concat(action);
const deaugmentState = (state, size) => state.slice(0, size);
const lastTimeStep = rkResults => rkResults.slice(-1)[0];

module.exports = dynamics => (state, action, dt) => {
  const augmentedState = augmentState(state, action);
  const results = rungeKutta4(dynamics, augmentedState, [0, dt]);
  const last = lastTimeStep(results);
  return deaugmentState(last, state.length);
};
