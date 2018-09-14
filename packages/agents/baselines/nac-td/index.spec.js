const Traces = require('@rl-js/baseline-function-approximators/traces/accumulating');
const {
  StateValueFunction,
  Policy,
  Environment,
  StateTraces,
} = require('../__mocks__/');
const NAC_TD = require('./');

describe('constructor', () => {
  const args = {
    alpha_w: 0.001,
    createAdvantageTraces: jest.fn(),
    lambda: 1,
    policy: new Policy(),
    stateTraces: new StateTraces(),
    stateValueFunction: new StateValueFunction(),
    update_frequency: 1,
    gamma: 1,
  };

  args.policy.getParameters.mockReturnValue([1, 2, 3]);

  test('constructs object', () => {
    expect(
      () => new NAC_TD(args),
    ).not.toThrow();
  });

  Object.keys(args).forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const myArgs = { ...args };
      myArgs[arg] = null;
      expect(() => new NAC_TD(myArgs)).toThrow(TypeError);
    });
  });
});


const initialize = ({ updateFrequency = 1 } = {}) => {
  const args = {
    alpha_w: 0.1,
    createAdvantageTraces: jest.fn(f => new Traces(f)),
    lambda: 1,
    policy: new Policy(),
    stateTraces: new StateTraces(),
    stateValueFunction: new StateValueFunction(),
    update_frequency: updateFrequency,
    gamma: 1,
  };

  args.policy.getParameters.mockReturnValue([1, 1, 1]);
  args.policy.gradient.mockReturnValue([1, 1, 1]);

  args.policy.chooseAction
    .mockReturnValue('action')
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2');

  args.stateValueFunction.call.mockImplementation((state) => {
    if (state === 'state1') return 1;
    if (state === 'state2') return 2;
    return 3;
  });

  const agent = new NAC_TD(args);

  jest.spyOn(agent.advantageTraces, 'reset');
  jest.spyOn(agent.advantageTraces, 'record');
  jest.spyOn(agent.advantageTraces, 'update');
  jest.spyOn(agent.advantageTraces, 'decay');

  const environment = new Environment();
  environment.getObservation
    .mockReturnValue('state')
    .mockReturnValueOnce('state1')
    .mockReturnValueOnce('state2');
  environment.getReward.mockReturnValue(10);
  environment.isTerminated.mockReturnValue(true).mockReturnValueOnce(false);

  return { agent, environment, args };
};

test('newEpisode', () => {
  const {
    agent,
    environment,
    args: {
      stateTraces,
    },
  } = initialize();
  agent.newEpisode(environment);
  expect(stateTraces.reset).toHaveBeenCalled();
  expect(agent.advantageTraces.reset).toHaveBeenCalled();
});

test('act', () => {
  const {
    agent,
    environment,
    args: {
      lambda,
      policy,
      stateTraces,
    },
  } = initialize();
  agent.newEpisode(environment);
  agent.act();


  expect(environment.dispatch).lastCalledWith('action1');

  expect(stateTraces.record).lastCalledWith('state1');
  expect(stateTraces.update).lastCalledWith(11);
  expect(stateTraces.decay).lastCalledWith(lambda);

  expect(agent.advantageTraces.record).lastCalledWith(['state1', 'action1']);
  expect(agent.advantageTraces.update).lastCalledWith(11);
  expect(agent.advantageTraces.decay).lastCalledWith(lambda);

  expect(policy.updateParameters).lastCalledWith([1.1, 1.1, 1.1]);
});

test('update policy every k time steps', () => {
  const {
    agent,
    environment,
    args: {
      policy,
    },
  } = initialize({ updateFrequency: 3 });

  agent.newEpisode(environment);
  agent.act();
  expect(policy.updateParameters).not.toBeCalled();
  agent.act();
  expect(policy.updateParameters).not.toBeCalled();
  agent.act();
  expect(policy.updateParameters).lastCalledWith([2.304, 2.304, 2.304]);
  agent.act();
  expect(policy.updateParameters).toHaveBeenCalledTimes(1);
});

test('terminal state', () => {
  const {
    agent,
    environment,
    args: {
      lambda,
      policy,
      stateTraces,
    },
  } = initialize();

  agent.newEpisode(environment);
  agent.act();
  agent.act();

  expect(environment.dispatch).lastCalledWith('action2');

  expect(stateTraces.record).lastCalledWith('state2');
  expect(stateTraces.update).lastCalledWith(8);
  expect(stateTraces.decay).lastCalledWith(lambda);

  expect(agent.advantageTraces.record).lastCalledWith(['state2', 'action2']);
  expect(agent.advantageTraces.update).lastCalledWith(4.699999999999999);
  expect(agent.advantageTraces.decay).lastCalledWith(lambda);

  expect(policy.updateParameters).lastCalledWith([2.04, 2.04, 2.04]);
});
