const math = require('mathjs');
const Gaussian = require('./');

const createApproximator = () => {
  let mean = 1;
  return {
    call: () => mean, // always return mean = 1
    update: (state, error) => {
      mean += error;
    },
  };
};

test('chooses actions from a gaussian distribution', () => {
  const policy = new Gaussian({
    functionApproximator: createApproximator(),
    variance: 1,
  });

  const actions = [];
  for (let i = 0; i < 10000; i++) actions.push(policy.chooseAction('state'));
  expect(math.mean(actions)).toBeCloseTo(1, 1);
  expect(math.std(actions)).toBeCloseTo(1, 1);
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
