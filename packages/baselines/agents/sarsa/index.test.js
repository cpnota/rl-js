const {
  ActionValueFunction,
  ActionTraces,
  Policy,
  Environment,
} = require('../__mocks__/');
const SarsaLambda = require('./');

describe('constructor', () => {
  test('constructs object', () => {
    expect(
      () => new SarsaLambda({
        actionValueFunction: new ActionValueFunction(),
        actionTraces: new ActionTraces(),
        policy: new Policy(),
        lambda: 0.5,
      }),
    ).not.toThrow();
  });

  const argNames = [
    'actionValueFunction',
    'actionTraces',
    'policy',
    'lambda',
    'gamma',
  ];

  argNames.forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const args = {
        actionValueFunction: new ActionValueFunction(),
        actionTraces: new ActionTraces(),
        policy: new Policy(),
        lambda: 0.5,
        gamma: 1,
      };
      args[arg] = null;
      expect(() => new SarsaLambda(args)).toThrow(TypeError);
    });
  });
});

const initialize = () => {
  const actionValueFunction = new ActionValueFunction();
  const actionTraces = new ActionTraces();
  const policy = new Policy();
  const lambda = 0.5;

  const agent = new SarsaLambda({
    actionValueFunction,
    actionTraces,
    policy,
    lambda,
  });
  const environment = new Environment();

  environment.getObservation
    .mockReturnValue(undefined)
    .mockReturnValueOnce('state1')
    .mockReturnValueOnce('state2');

  environment.getReward.mockReturnValue(10);

  environment.isTerminated.mockReturnValue(true).mockReturnValueOnce(false);

  policy.chooseAction
    .mockReturnValue(undefined)
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2');

  actionValueFunction.call.mockImplementation((state, action) => {
    if (state === 'state1' && action === 'action1') return 1;
    if (state === 'state2' && action === 'action2') return 2;
    throw new Error('Unknown state action pair');
  });

  return {
    agent,
    actionValueFunction,
    actionTraces,
    policy,
    environment,
    lambda,
  };
};

test('newEpisode', () => {
  const { agent, actionTraces, environment } = initialize();
  agent.newEpisode(environment);
  expect(actionTraces.reset).toHaveBeenCalled();
});

test('act', () => {
  const {
    agent, actionTraces, environment, lambda,
  } = initialize();

  agent.newEpisode(environment);
  agent.act();

  expect(environment.dispatch).lastCalledWith('action1');
  expect(actionTraces.record).lastCalledWith('state1', 'action1');
  expect(actionTraces.update).lastCalledWith(11);
  expect(actionTraces.decay).lastCalledWith(lambda);
});

test('terminal state', () => {
  const {
    agent, actionTraces, environment, lambda,
  } = initialize();

  agent.newEpisode(environment);
  agent.act();
  agent.act();

  expect(environment.dispatch).lastCalledWith('action2');
  expect(actionTraces.record).lastCalledWith('state2', 'action2');
  expect(actionTraces.update).lastCalledWith(8);
  expect(actionTraces.decay).lastCalledWith(lambda);
});
