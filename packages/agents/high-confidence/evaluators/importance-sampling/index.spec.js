const {
  importanceSampling,
  weightedImportanceSampling,
  perDecisionImportanceSampling,
} = require('.');

const trajectories = [[{
  state: 'state1',
  action: 'action1',
  probability: 0.5,
  reward: 1,
},
{
  state: 'state2',
  action: 'action2',
  probability: 0.8,
  reward: 3,
},
{
  state: 'state3',
  action: 'action3',
  probability: 0.2,
  reward: -8,
}], [{
  state: 'state1',
  action: 'action2',
  probability: 0.5,
  reward: 2,
},
{
  state: 'state1',
  action: 'action1',
  probability: 0.5,
  reward: 2,
}]];

const policy = {
  probabilities: {
    state1: {
      action1: 0.5,
      action2: 0.25,
      action3: 0.25,
    },
    state2: {
      action1: 0.3,
      action2: 0.4,
      action3: 0.3,
    },
    state3: {
      action1: 0.1,
      action2: 0.1,
      action3: 0.8,
    },
  },
  probability: (state, action) => policy.probabilities[state][action],
};

const expected = [{
  weight: 2,
  return: -4,
  estimate: -8,
}, {
  weight: 0.5,
  return: 4,
  estimate: 2,
}];

test('computes an importance sampling estimate for a single trajectory', () => {
  const estimate = importanceSampling({ trajectories: [trajectories[0]], policy });
  expect(estimate).toEqual(expected[0].estimate);
});

test('computs importance sampling estimate for a set of trajectories', () => {
  const estimate = importanceSampling({ trajectories, policy });
  expect(estimate).toEqual((expected[0].estimate + expected[1].estimate) / 2);
});

test('computes weighted importance sampling estimate for a single trajectory', () => {
  const estimate = weightedImportanceSampling({ trajectories: [trajectories[0]], policy });
  expect(estimate).toEqual(expected[0].return);
});

test('computes weighted importance sampling estimate for a set of trajectories', () => {
  const estimate = weightedImportanceSampling({ trajectories, policy });
  expect(estimate).toEqual(
    (expected[0].estimate + expected[1].estimate)
    / (expected[0].weight + expected[1].weight),
  );
});

test('computes per-decision importance sampling estimate for a single trajectory', () => {
  const estimate = perDecisionImportanceSampling({ trajectories: [trajectories[0]], policy });
  expect(estimate).toEqual(-13.5);
});

test.only('computes per-decision importance sampling estimate for a set of trajectories', () => {
  const estimate = perDecisionImportanceSampling({ trajectories, policy });
  expect(estimate).toEqual(-5.75);
});
