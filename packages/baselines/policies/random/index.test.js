const Random = require('./index');

const actions = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
};

it('chooses actions uniformly randomly', () => {
  const policy = new Random({
    actions,
  });

  const frequencies = runTrial(policy);
  expect(frequencies.a).toBeCloseTo(0.25, 1);
  expect(frequencies.b).toBeCloseTo(0.25, 1);
  expect(frequencies.c).toBeCloseTo(0.25, 1);
  expect(frequencies.d).toBeCloseTo(0.25, 1);
});

it('computes action probabilities', () => {
  const policy = new Random({
    actions,
  });

  expect(policy.probability()).toEqual(0.25);
});

const runTrial = (policy) => {
  const total = 1000;

  const frequencies = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };

  for (let i = 0; i < total; i++) {
    const action = policy.chooseAction();
    frequencies[action] += 1 / total;
  }

  return frequencies;
};
