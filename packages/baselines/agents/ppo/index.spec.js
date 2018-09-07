const PPO = require('.');

test('computes advantages', () => {
  const stateValueFunction = {
    call: state => state * 2,
  };

  const agent = new PPO({
    stateValueFunction,
    gamma: 1,
  });
  agent.history = [1, 2, 3].map(state => ({
    state,
    reward: state,
    value: stateValueFunction.call(state), // some value function
    terminal: state === 3,
  }));
  agent.computeTdErrors();
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
