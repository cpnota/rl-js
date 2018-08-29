const Exponential = require('./');

test('gets the name', () => {
  const hyper = new Exponential({ name: 'epsilon', min: 1, max: 2 });
  expect(hyper.getName()).toEqual('epsilon');
});

test('returns the default value', () => {
  const hyper = new Exponential({ min: 1, max: 2, default: 1.5 });
  expect(hyper.defaultValue()).toEqual(1.5);
});

test('discretizes hyperparameters', () => {
  const hyper = new Exponential({
    min: 0.01,
    max: 1,
    base: 10,
  });
  expect(hyper.discretize(3)).toEqual([
    0.01000000000000001,
    0.10000000000000005,
    1,
  ]);
});

test('returns a random value', () => {
  const hyper = new Exponential({
    min: 5,
    max: 7,
  });
  const value = hyper.randomValue();
  expect(value).toBeGreaterThan(5);
  expect(value).toBeLessThan(7);
});
