const PPO = require('.');
const FixedBatch = require('./batches/fixed');
const MiniBatchSGD = require('./optimize/minibatch-sgd');
const {
  StateValueFunction,
  PolicyTraces,
  Policy,
  Environment,
  StateTraces,
} = require('../__mocks__/');

const args = {
  batchStrategy: new FixedBatch(10),
  epsilon: 0.5,
  gamma: 1,
  lambda: 1,
  optimizer: new MiniBatchSGD({ miniBatchSize: 5, epochs: 10 }),
  policy: new Policy(),
  stateValueFunction: new StateValueFunction(),
}

describe('constructor', () => {
  test('constructs object', () => {
    expect(
      () => new PPO(args),
    ).not.toThrow();
  });

  Object.keys(args).forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const myArgs = { ...args };
      myArgs[arg] = null;
      expect(() => new PPO(myArgs)).toThrow(TypeError);
    });
  });
});

const initialize = () => {
  const stateValueFunction = new StateValueFunction();
  const stateTraces = new StateTraces();
  const stochasticPolicy = new Policy();
  const policyTraces = new PolicyTraces();
  const lambda = 0.5;

  const agent = new ActorCritic({
    stateValueFunction,
    stateTraces,
    stochasticPolicy,
    policyTraces,
    lambda,
  });

  const environment = new Environment();

  environment.getObservation
    .mockReturnValue(undefined)
    .mockReturnValueOnce('state1')
    .mockReturnValueOnce('state2');

  environment.getReward.mockReturnValue(10);

  environment.isTerminated.mockReturnValue(true).mockReturnValueOnce(false);

  stochasticPolicy.chooseAction
    .mockReturnValue(undefined)
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2');

  stateValueFunction.call.mockImplementation((state) => {
    if (state === 'state1') return 1;
    if (state === 'state2') return 2;
    throw new Error('Unknown state');
  });

  return {
    agent,
    stateValueFunction,
    stateTraces,
    stochasticPolicy,
    policyTraces,
    environment,
    lambda,
  };
};

test.skip('newEpisode', () => {
  const {
    agent, policyTraces, stateTraces, environment,
  } = initialize();
  agent.newEpisode(environment);
  expect(stateTraces.reset).toHaveBeenCalled();
  expect(policyTraces.reset).toHaveBeenCalled();
});

test.skip('act', () => {
  const {
    agent, policyTraces, stateTraces, environment, lambda,
  } = initialize();

  agent.newEpisode(environment);
  agent.act();

  expect(environment.dispatch).lastCalledWith('action1');
  expect(stateTraces.record).lastCalledWith('state1');
  expect(stateTraces.update).lastCalledWith(11);
  expect(stateTraces.decay).lastCalledWith(lambda);
  expect(policyTraces.record).lastCalledWith('state1', 'action1');
  expect(policyTraces.update).lastCalledWith(11);
  expect(policyTraces.decay).lastCalledWith(lambda);
});

test.skip('terminal state', () => {
  const {
    agent, policyTraces, stateTraces, environment, lambda,
  } = initialize();

  agent.newEpisode(environment);
  agent.act();
  agent.act();

  expect(environment.dispatch).lastCalledWith('action2');
  expect(stateTraces.record).lastCalledWith('state2');
  expect(stateTraces.update).lastCalledWith(8);
  expect(stateTraces.decay).lastCalledWith(lambda);
  expect(policyTraces.record).lastCalledWith('state2', 'action2');
  expect(policyTraces.update).lastCalledWith(8);
  expect(policyTraces.decay).lastCalledWith(lambda);
});


test('computes advantages', () => {
  const stateValueFunction = {
    call: state => state * 2,
  };

  const agent = new PPO({
    ...args,
    stateValueFunction,
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
    ...args,
    epsilon: 0.2,
  });

  expect(agent.clip(1.3)).toEqual(1.2);
  expect(agent.clip(1.1)).toEqual(1.1);
  expect(agent.clip(0.7)).toEqual(0.8);
});

test('should clip', () => {
  const agent = new PPO({
    ...args,
    epsilon: 0.2,
  });

  expect(agent.shouldClip(1.3, 1)).toEqual(true);
  expect(agent.shouldClip(1.3, -1)).toEqual(false);
  expect(agent.shouldClip(0.7, 1)).toEqual(false);
  expect(agent.shouldClip(0.7, -1)).toEqual(true);
  expect(agent.shouldClip(1.1, 1)).toEqual(false);
  expect(agent.shouldClip(1.1, -1)).toEqual(false);
});
