const EpsilonGreedy = require('./index');

const actions = {
  a: 'a',
  b: 'b',
  c: 'c',
};

const createQ = values => ({
  call: jest.fn((state, action) => values[action]),
});

const runTrial = (policy) => {
  const total = 1000;

  const frequencies = {
    a: 0,
    b: 0,
    c: 0,
  };

  for (let i = 0; i < 1000; i += 1) {
    const action = policy.chooseAction([1, 2, 3]);
    frequencies[action] += 1 / total;
  }

  return frequencies;
};


it('calls q for all actions', () => {
  const actionValueFunction = createQ({ a: -2, b: -1, c: -3 });

  const policy = new EpsilonGreedy({
    epsilon: 0,
    actions,
    actionValueFunction,
  });

  const state = [1, 2, 3];
  policy.chooseAction(state);

  expect(policy.actionValueFunction.call.mock.calls).toEqual([
    [state, actions.a],
    [state, actions.b],
    [state, actions.c],
  ]);
});

it('selects the best action', () => {
  const actionValueFunction = createQ({ a: -2, b: -1, c: -3 });

  const policy = new EpsilonGreedy({
    epsilon: 0,
    actions,
    actionValueFunction,
  });

  const frequencies = runTrial(policy);
  expect(frequencies.a).toEqual(0);
  expect(frequencies.b).toBeCloseTo(1);
  expect(frequencies.c).toEqual(0);
});

it('selects randomly among the best actions', () => {
  const actionValueFunction = createQ({ a: 3, b: 3, c: -3 });

  const policy = new EpsilonGreedy({
    epsilon: 0,
    actions,
    actionValueFunction,
  });

  const frequencies = runTrial(policy);
  expect(frequencies.a).toBeCloseTo(0.5, 1);
  expect(frequencies.b).toBeCloseTo(0.5, 1);
  expect(frequencies.c).toEqual(0);
});

it('selects a random action with the correct frequency', () => {
  const actionValueFunction = createQ({ a: 1, b: 2, c: 3 });

  const policy = new EpsilonGreedy({
    epsilon: 0.6,
    actions,
    actionValueFunction,
  });

  const frequencies = runTrial(policy);
  expect(frequencies.a).toBeCloseTo(0.2, 1);
  expect(frequencies.b).toBeCloseTo(0.2, 1);
  expect(frequencies.c).toBeCloseTo(0.6, 1);
});

it('computes the probability of choosing actions', () => {
  const actionValueFunction = createQ({ a: 1, b: 2, c: 3 });

  const policy = new EpsilonGreedy({
    epsilon: 0.75,
    actions,
    actionValueFunction,
  });

  expect(policy.probability({}, actions.a)).toEqual(0.25);
  expect(policy.probability({}, actions.b)).toEqual(0.25);
  expect(policy.probability({}, actions.c)).toEqual(0.5);
});

it('computes probability of choosing action when there are multiple bests', () => {
  const actionValueFunction = createQ({ a: 1, b: 3, c: 3 });

  const policy = new EpsilonGreedy({
    epsilon: 0.75,
    actions,
    actionValueFunction,
  });

  expect(policy.probability({}, actions.a)).toEqual(0.25);
  expect(policy.probability({}, actions.b)).toEqual(0.375);
  expect(policy.probability({}, actions.c)).toEqual(0.375);
});
