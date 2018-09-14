const { importanceSampling } = require('.');

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

test('computes an importance sampling estimate for a single history', () => {
  const estimate = importanceSampling({ trajectories: [trajectories[0]], policy });
  const expectedImportanceWeight = 2;
  const expectedReturn = -4;
  expect(estimate).toEqual(expectedImportanceWeight * expectedReturn);
});

test('computs importance sampling estimate for set of trajectories', () => {
  const estimate = importanceSampling({ trajectories, policy });
  const trajectory1Estimate = -8;
  const trajectory2Estimate = 2;
  expect(estimate).toEqual((trajectory1Estimate + trajectory2Estimate) / 2);
});
