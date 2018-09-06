const PPO = require('.');

test('gets baselines', () => {
  const agent = new PPO({
    stateValueFunction: {
      call: state => state * 2,
    },
  });
  agent.history = [1, 2, 3].map(state => ({
    state,
  }));
  agent.computeBaselines();
  expect(agent.history.map(({ baseline }) => baseline)).toEqual([2, 4, 6]);
});

test('computes advantages', () => {
  const agent = new PPO({
    stateValueFunction: {
      call: state => state * 2,
    },
  });
  agent.history = [1, 2, 3].map(state => ({
    state,
    reward: state,
    terminal: state === 3,
  }));
  agent.computeAdvantages();
  expect(agent.history.map(({ advantage }) => advantage)).toEqual([4, 1, -3]);
});

test('clips', () => {
  const agent = new PPO({
    epsilon: 0.2,
  });

  expect(agent.clip(1.3)).toEqual(1.2);
  expect(agent.clip(1.1)).toEqual(1.1);
  expect(agent.clip(0.7)).toEqual(0.8);
});

test('should clip', () => {
  const agent = new PPO({
    epsilon: 0.2,
  });

  expect(agent.shouldClip(1.3, 1)).toEqual(true);
  expect(agent.shouldClip(1.3, -1)).toEqual(false);
  expect(agent.shouldClip(0.7, 1)).toEqual(false);
  expect(agent.shouldClip(0.7, -1)).toEqual(true);
  expect(agent.shouldClip(1.1, 1)).toEqual(false);
  expect(agent.shouldClip(1.1, -1)).toEqual(false);
});
