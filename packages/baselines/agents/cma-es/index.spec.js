const {
  Environment,
  Policy,
} = require('../__mocks__/');
const CMA_ES = require('.');

describe('constructor', () => {
  test('constructs object', () => {
    expect(
      () => new CMA_ES({
        policy: new Policy(),
        std: 1,
        population: 10,
      }),
    ).not.toThrow();
  });

  const argNames = [
    'policy',
    'std',
    'population',
    'gamma',
  ];

  argNames.forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const args = {
        policy: new Policy(),
        std: 1,
        population: 10,
        gamma: 1,
      };
      args[arg] = null;
      expect(() => new CMA_ES(args)).toThrow(TypeError);
    });
  });
});
