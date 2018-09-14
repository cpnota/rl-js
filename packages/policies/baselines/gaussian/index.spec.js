const math = require('mathjs');
const gaussian = require('gaussian');
const Gaussian = require('.');

const createApproximator = () => {
  let mean = 1;
  return {
    call: () => mean, // always return mean = 1
    update: (state, error) => {
      mean += error;
    },
    gradient: () => ([1]),
  };
};

test('chooses actions from a gaussian distribution', () => {
  const policy = new Gaussian({
    functionApproximator: createApproximator(),
    variance: 1,
    min: 0,
    max: 2,
  });

  const actions = [];
  for (let i = 0; i < 10000; i += 1) actions.push(policy.chooseAction('state'));
  expect(math.mean(actions)).toBeCloseTo(1, 1);
  expect(math.std(actions)).toBeCloseTo(0.7, 1); // variance is reduced by clipping
});

test('updates mean of distribution', () => {
  const approximator = createApproximator();

  const policy = new Gaussian({
    functionApproximator: approximator,
    variance: 1,
  });

  policy.update({}, 2, 0.5);
  expect(approximator.call()).toEqual(1.5);
});

test('computes probability of in bound action', () => {
  const policy = new Gaussian({
    functionApproximator: createApproximator(),
    variance: 1,
    min: 0,
    max: 2,
  });

  const state = 0;
  const action = 1;
  expect(policy.probability(state, action)).toBe(gaussian(1, 1).pdf(action));
});

test('computes probability of out of bound actions as 0', () => {
  const policy = new Gaussian({
    functionApproximator: createApproximator(),
    variance: 1,
    min: -1,
    max: 1,
  });

  expect(policy.probability(0, -2)).toBe(0);
  expect(policy.probability(0, 2)).toBe(0);
});

test('computes probability of boundary actions', () => {
  const minAction = 0;
  const maxAction = 2;

  const policy = new Gaussian({
    functionApproximator: createApproximator(),
    variance: 1,
    min: minAction,
    max: maxAction,
  });

  const state = 0;
  expect(policy.probability(state, minAction)).toBe(gaussian(1, 1).cdf(minAction));
  expect(policy.probability(state, maxAction)).toBe(1 - gaussian(1, 1).cdf(maxAction));
});

const testUpdate = (action) => {
  const state = 0;
  const minAction = 0;
  const maxAction = 2;

  const policy = new Gaussian({
    functionApproximator: createApproximator(),
    variance: 1,
    min: minAction,
    max: maxAction,
  });

  const probability = policy.probability(state, action);
  policy.update(state, action, 1);
  const newProbability = policy.probability(state, action);
  expect(newProbability).toBeGreaterThan(probability);
};

test('updates correctly at min', () => {
  testUpdate(0);
});

test('updates correctly at max', () => {
  testUpdate(2);
});

test('updates correctly in middle', () => {
  testUpdate(1.5);
});
