const {
  // Environment,
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

test('generates population correctly', () => {
  const policy = new Policy();
  const initialParameters = [-1, 1];

  policy.getParameters
    .mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    std: 0.001,
    population: 10,
  });

  const population = agent.generatePopulation();
  expect(population.length).toBe(10);

  population.forEach((epsilons) => {
    expect(epsilons.length).toBe(2);
    epsilons.forEach((epsilon) => {
      expect(epsilon).not.toEqual(0);
      expect(epsilon).toBeGreaterThan(-1);
      expect(epsilon).toBeLessThan(1);
    });
  });
});
