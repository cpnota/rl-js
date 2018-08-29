const Discrete = require('./');

test('gets the name', () => {
  const hyper = new Discrete({ name: 'epsilon' });
  expect(hyper.getName()).toEqual('epsilon');
});

test('returns the default value', () => {
  const hyper = new Discrete({ default: 5 });
  expect(hyper.defaultValue()).toEqual(5);
});

test('discretizes hyperparameters', () => {
  const hyper = new Discrete({
    values: [0, 1, 2],
  });
  expect(hyper.discretize()).toEqual([0, 1, 2]);
});

test('returns a random value', () => {
  const hyper = new Discrete({
    values: [3, 4, 5],
  });
  const value = hyper.randomValue();
  expect(value).toBeGreaterThan(2);
  expect(value).toBeLessThan(6);
});
