const {
  StateValueFunction,
  Policy,
  // Environment,
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
