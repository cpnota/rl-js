const Fixed = require('./');

test('gets the name', () => {
  const hyper = new Fixed({ name: 'epsilon' });
  expect(hyper.getName()).toEqual('epsilon');
});

test('returns the default value', () => {
  const hyper = new Fixed({ value: 5 });
  expect(hyper.defaultValue()).toEqual(5);
});

test('discretizes hyperparameters', () => {
  const hyper = new Fixed({
    value: 5,
  });
  expect(hyper.discretize()).toEqual([5]);
});

test('returns a random value', () => {
  const hyper = new Fixed({
    value: 5,
  });
  const value = hyper.randomValue();
  expect(value).toEqual(5);
});
