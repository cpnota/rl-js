const Linear = require('./');

test('gets the name', () => {
  const hyper = new Linear({ name: 'epsilon' });
  expect(hyper.getName()).toEqual('epsilon');
});

test('returns the default value', () => {
  const hyper = new Linear({ default: 5 });
  expect(hyper.defaultValue()).toEqual(5);
});

test('discretizes hyperparameters', () => {
  const hyper = new Linear({
    min: 0,
    max: 8,
  });
  expect(hyper.discretize(5)).toEqual([0, 2, 4, 6, 8]);
});

test('returns a random value', () => {
  const hyper = new Linear({
    min: 5,
    max: 7,
  });
  const value = hyper.randomValue();
  expect(value).toBeGreaterThan(5);
  expect(value).toBeLessThan(7);
});
