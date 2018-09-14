const {
  StateValueFunction,
  Policy,
  Environment,
  StateTraces,
} = require('../__mocks__/');
const REINFORCE = require('./');

describe('constructor', () => {
  test('constructs object', () => {
    expect(
      () => new REINFORCE({
        stateValueFunction: new StateValueFunction(),
        stateTraces: new StateTraces(),
        policy: new Policy(),
        lambda: 0.5,
      }),
    ).not.toThrow();
  });

  const argNames = [
    'stateValueFunction',
    'stateTraces',
    'policy',
    'lambda',
    'gamma',
  ];

  argNames.forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const args = {
        stateValueFunction: new StateValueFunction(),
        stateTraces: new StateTraces(),
        policy: new Policy(),
        lambda: 0.5,
        gamma: 1,
      };
      args[arg] = null;
      expect(() => new REINFORCE(args)).toThrow(TypeError);
    });
  });
});

const initialize = () => {
  const stateValueFunction = new StateValueFunction();
  const stateTraces = new StateTraces();
  const policy = new Policy();
  const lambda = 0.5;

  const agent = new REINFORCE({
    stateValueFunction,
    stateTraces,
    policy,
    lambda,
  });

  const environment = new Environment();

  environment.getObservation
    .mockReturnValue(undefined)
    .mockReturnValueOnce('state1')
    // state 2 called twice: once by getTDError
    .mockReturnValueOnce('state2')
    .mockReturnValueOnce('state2');

  environment.getReward.mockReturnValue(10);

  environment.isTerminated
    .mockReturnValue(true)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false);

  policy.chooseAction
    .mockReturnValue(undefined)
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2');

  stateValueFunction.call.mockImplementation((state) => {
    if (state === 'state1') return 1;
    if (state === 'state2') return 2;
    throw new Error(`Unknown state ${state}`);
  });

  return {
    agent,
    stateValueFunction,
    stateTraces,
    policy,
    environment,
    lambda,
  };
};

test('computes MC returns', () => {
  const reinforce = new REINFORCE({
    stateValueFunction: new StateValueFunction(),
    stateTraces: new StateTraces(),
    policy: new Policy(),
    lambda: 0.5,
    gamma: 0.5,
  });
  reinforce.history = [4, 4, 4].map(reward => ({ reward }));
  expect(reinforce.computeReturns()).toEqual([7, 6, 4]);
});

test('newEpisode', () => {
  const { agent, stateTraces, environment } = initialize();
  agent.newEpisode(environment);
  expect(stateTraces.reset).toHaveBeenCalled();
});

test('act', () => {
  const {
    agent, stateTraces, environment, lambda,
  } = initialize();

  agent.newEpisode(environment);
  agent.act();

  expect(environment.dispatch).lastCalledWith('action1');
  expect(stateTraces.record).lastCalledWith('state1');
  expect(stateTraces.update).lastCalledWith(11);
  expect(stateTraces.decay).lastCalledWith(lambda);
});

test('terminal state', () => {
  const {
    agent, policy, stateTraces, environment, lambda,
  } = initialize();

  agent.newEpisode(environment);
  agent.act();
  agent.act();

  expect(environment.dispatch).lastCalledWith('action2');
  expect(stateTraces.record).lastCalledWith('state2');
  expect(stateTraces.update).lastCalledWith(8);
  expect(stateTraces.decay).lastCalledWith(lambda);
  expect(policy.update).nthCalledWith(1, 'state1', 'action1', 19);
  expect(policy.update).nthCalledWith(2, 'state2', 'action2', 8);
});
