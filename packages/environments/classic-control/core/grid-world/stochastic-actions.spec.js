const configureResolveActions = require('./stochastic-actions');

const test = (resolve, action, probabilities) => {
  const results = {};
  const trials = 10000;
  for (let i = 0; i < trials; i++) {
    const type = resolve(null, action).type;
    results[type] = (results[type] || 0) + 1;
  }
  Object.entries(probabilities).forEach(([key, value]) => {
    expect(results[key] / trials).toBeCloseTo(value, 1);
  });
};

it('does nothing with appropriate probability', () => {
  const resolve = configureResolveActions({ doNothingProbability: 0.1 });
  test(resolve, 'LEFT', {
    LEFT: 0.9,
    DO_NOTHING: 0.1,
  });
});

it('resolves LEFT action with appropriate probabilities', () => {
  const resolve = configureResolveActions({
    doNothingProbability: 0.1,
    wrongDirectionProbability: 0.2,
  });
  test(resolve, 'LEFT', {
    LEFT: 0.7,
    UP: 0.1,
    DOWN: 0.1,
    DO_NOTHING: 0.1,
  });
});

it('resolves RIGHT action with appropriate probabilities', () => {
  const resolve = configureResolveActions({
    doNothingProbability: 0.1,
    wrongDirectionProbability: 0.2,
  });
  test(resolve, 'RIGHT', {
    RIGHT: 0.7,
    UP: 0.1,
    DOWN: 0.1,
    DO_NOTHING: 0.1,
  });
});

it('resolves DOWN action with appropriate probabilities', () => {
  const resolve = configureResolveActions({
    doNothingProbability: 0.1,
    wrongDirectionProbability: 0.2,
  });
  test(resolve, 'DOWN', {
    DOWN: 0.7,
    LEFT: 0.1,
    RIGHT: 0.1,
    DO_NOTHING: 0.1,
  });
});

it('resolves UP action with appropriate probabilities', () => {
  const resolve = configureResolveActions({
    doNothingProbability: 0.1,
    wrongDirectionProbability: 0.2,
  });
  test(resolve, 'UP', {
    UP: 0.7,
    LEFT: 0.1,
    RIGHT: 0.1,
    DO_NOTHING: 0.1,
  });
});
