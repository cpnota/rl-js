const PPO = require('.');
const FixedBatch = require('./batch-strategies/fixed');
const MiniBatchSGD = require('./optimizers/minibatch-sgd');
const {
  StateValueFunction,
  Policy,
  Environment,
} = require('../__mocks__/');

const defaultArgs = {
  batchStrategy: new FixedBatch(10),
  epsilon: 0.5,
  gamma: 1,
  optimizer: new MiniBatchSGD({ miniBatchSize: 5, epochs: 10 }),
  policy: new Policy(),
  stateValueFunction: new StateValueFunction(),
};

describe('constructor', () => {
  test('constructs object', () => {
    expect(
      () => new PPO(defaultArgs),
    ).not.toThrow();
  });

  Object.keys(defaultArgs).forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const myArgs = { ...defaultArgs };
      myArgs[arg] = null;
      expect(() => new PPO(myArgs)).toThrow(TypeError);
    });
  });
});

const initialize = () => {
  const batchStrategy = new FixedBatch(3);
  const epsilon = 0.5;
  const gamma = 1;
  const lambda = 1;
  const optimizer = new MiniBatchSGD({ miniBatchSize: 5, epochs: 10 });
  const policy = new Policy();
  const stateValueFunction = new StateValueFunction();

  const args = {
    batchStrategy,
    epsilon,
    gamma,
    lambda,
    optimizer,
    policy,
    stateValueFunction,
  };

  const agent = new PPO(args);

  const environment = new Environment();

  environment.getObservation
    .mockReturnValue(undefined)
    .mockReturnValueOnce('state1')
    .mockReturnValueOnce('state2')
    .mockReturnValueOnce('state3');

  environment.getReward.mockReturnValue(10);

  environment.isTerminated.mockReturnValue(true).mockReturnValueOnce(false);

  policy.chooseAction
    .mockReturnValue(undefined)
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2')
    .mockReturnValueOnce('action3');

  policy.probability
    .mockReturnValue(0.5);

  policy.gradient
    .mockReturnValue([1]);

  stateValueFunction.call.mockImplementation((state) => {
    if (state === 'state1') return 1;
    if (state === 'state2') return 2;
    if (state === 'state3') return 3;
    throw new Error('Unknown state');
  });

  return {
    agent,
    args,
    environment,
  };
};

test('newEpisode', () => {
  const {
    agent, environment,
  } = initialize();
  agent.newEpisode(environment);
});

test('records histories', () => {
  const {
    agent, environment,
  } = initialize();

  agent.update = jest.fn(agent.update.bind(agent));

  agent.newEpisode(environment);
  agent.act();
  agent.act();

  expect(agent.update).not.toHaveBeenCalled();
  expect(agent.history).toEqual([
    {
      action: 'action1',
      actionProbability: 0.5,
      reward: 10,
      state: 'state1',
      terminal: false,
      value: 1,
    },
    {
      action: 'action2',
      actionProbability: 0.5,
      reward: 10,
      state: 'state2',
      terminal: true,
      value: 2,
    },
  ]);
});

test('updates when appropriate', () => {
  const {
    agent, environment,
  } = initialize();

  agent.update = jest.fn();

  agent.newEpisode(environment);
  agent.act();
  agent.act();
  agent.act();

  expect(agent.update).toHaveBeenCalled();
  expect(agent.history).toEqual([]);
});

describe('update', () => {
  const history = [
    {
      action: 'action1',
      actionProbability: 0.5,
      reward: 1,
      state: 'state1',
      terminal: false,
      value: 0,
      tdError: 11,
      advantage: 1,
    },
    {
      action: 'action2',
      actionProbability: 0.5,
      reward: 0,
      state: 'state2',
      terminal: false,
      value: 10,
      tdError: -10,
      advantage: -10,
    },
    {
      action: 'action2',
      actionProbability: 0.5,
      reward: 0,
      state: 'state2',
      terminal: true,
      value: 100,
      tdError: undefined,
      advantage: 0,
    },
  ];

  test('computes td errors', () => {
    const { agent } = initialize();
    agent.history = history.map(({ ...params }) => ({ ...params, tdError: undefined }));
    agent.computeTdErrors();
    expect(agent.history).toEqual(history);
  });

  test('computes advantages', () => {
    const { agent } = initialize();
    agent.history = history.map(({ ...params }) => ({ ...params, advantage: undefined }));
    agent.computeAdvantages();
    expect(agent.history).toEqual(history);
  });

  test('optimizers value function', () => {
    const { agent, args: { stateValueFunction } } = initialize();
    agent.history = history;
    agent.optimizeValueFunction();
    expect(stateValueFunction.update.mock.calls).toEqual([
      ['state1', 11],
      ['state2', -10],
    ]);
  });

  test('optimizes policy', () => {
    const { agent, args: { optimizer, policy } } = initialize();
    jest.spyOn(optimizer, 'optimize');
    agent.history = history;
    agent.optimizePolicy();
    expect(optimizer.optimize).toHaveBeenCalled();
    expect(policy.updateParameters.mock.calls).toEqual(new Array(6).fill([[-1]]));
  });

  test('performs entire update', () => {
    const { agent, args: { optimizer, policy, stateValueFunction } } = initialize();
    jest.spyOn(optimizer, 'optimize');
    agent.history = history.map(({ ...params }) => ({ ...params, tdError: undefined }));
    agent.history = history.map(({ ...params }) => ({ ...params, advantage: undefined }));
    agent.update();
    expect(agent.history).toEqual(history);
    expect(stateValueFunction.update.mock.calls).toEqual([
      ['state1', 11],
      ['state2', -10],
    ]);
    expect(policy.updateParameters.mock.calls).toEqual(new Array(6).fill([[-1]]));
  });
});

describe('getSampleGradient', () => {
  test('clipped', () => {
    const { agent, args: { policy } } = initialize();
    policy.probability.mockReturnValue(0.5);
    policy.gradient.mockReturnValue([1, -1]);
    const gradient = agent.getSampleGradient({
      state: 'state1', action: 'action1', advantage: 10, actionProbability: 0.25,
    });
    expect(gradient).toBe(0);
  });

  test('unclipped', () => {
    const { agent, args: { policy } } = initialize();
    policy.probability.mockReturnValue(0.25);
    policy.gradient.mockReturnValue([1, -1]);
    const gradient = agent.getSampleGradient({
      state: 'state1', action: 'action1', advantage: 10, actionProbability: 0.5,
    });
    expect(gradient).toEqual([20, -20]);
  });
});

test('clips', () => {
  const agent = new PPO({
    ...defaultArgs,
    epsilon: 0.2,
  });

  expect(agent.clip(1.3)).toEqual(1.2);
  expect(agent.clip(1.1)).toEqual(1.1);
  expect(agent.clip(0.7)).toEqual(0.8);
});

test('should clip', () => {
  const agent = new PPO({
    ...defaultArgs,
    epsilon: 0.2,
  });

  expect(agent.shouldClip(1.3, 1)).toEqual(true);
  expect(agent.shouldClip(1.3, -1)).toEqual(false);
  expect(agent.shouldClip(0.7, 1)).toEqual(false);
  expect(agent.shouldClip(0.7, -1)).toEqual(true);
  expect(agent.shouldClip(1.1, 1)).toEqual(false);
  expect(agent.shouldClip(1.1, -1)).toEqual(false);
});
