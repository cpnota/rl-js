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
        alpha: 0.5,
        std: 1,
        population: 10,
      }),
    ).not.toThrow();
  });

  const argNames = [
    'policy',
    'alpha',
    'std',
    'population',
    'gamma',
  ];

  argNames.forEach((arg) => {
    test(`throws error if ${arg} is not defined`, () => {
      const args = {
        policy: new Policy(),
        alpha: 0.5,
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

  policy.getParameters.mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    alpha: 0.5,
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

test('initializes first episode correctly', () => {
  const policy = new Policy();
  const initialParameters = [-1, 1];
  policy.getParameters
    .mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    alpha: 0.5,
    std: 0.001,
    population: 10,
  });

  agent.newEpisode(new Environment());

  const parameters = policy.setParameters.mock.calls[0][0];
  expect(parameters.length).toBe(2);
  parameters.forEach((parameter, i) => {
    expect(parameter).toBe(initialParameters[i] + agent.population[0][i]);
  });
});

test('initializes second episode correctly', () => {
  const policy = new Policy();
  const initialParameters = [-1, 1];
  policy.getParameters.mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    alpha: 0.5,
    std: 0.001,
    population: 10,
  });

  agent.newEpisode(new Environment());
  agent.newEpisode(new Environment());

  const parameters = policy.setParameters.mock.calls[1][0];
  expect(parameters.length).toBe(2);
  parameters.forEach((parameter, i) => {
    expect(parameter).toBe(initialParameters[i] + agent.population[1][i]);
  });
});

test('executes policy over episode', () => {
  const policy = new Policy();

  const initialParameters = [-1, 1];
  policy.getParameters
    .mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    alpha: 0.5,
    std: 0.001,
    population: 10,
  });

  const environment = new Environment();
  environment.getReward.mockReturnValue(10);

  environment.getObservation
    .mockReturnValue()
    .mockReturnValueOnce('state1')
    .mockReturnValueOnce('state2')
    .mockReturnValueOnce('state3');

  policy.chooseAction
    .mockReturnValue()
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2')
    .mockReturnValueOnce('action3');

  agent.newEpisode(environment);
  agent.act();
  agent.act();
  agent.act();

  expect(policy.chooseAction.mock.calls).toEqual([['state1'], ['state2'], ['state3']]);
  expect(environment.dispatch.mock.calls).toEqual([['action1'], ['action2'], ['action3']]);
});

test('records returns correctly each episode', () => {
  const policy = new Policy();

  const initialParameters = [-1, 1];
  policy.getParameters.mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    alpha: 0.5,
    std: 0.001,
    population: 10,
  });

  let environment = new Environment();
  environment.getReward.mockReturnValue(10);

  agent.newEpisode(environment);
  agent.act();
  agent.act();
  agent.act();

  environment = new Environment();
  environment.getReward.mockReturnValue(5);
  agent.newEpisode(environment);
  agent.act();
  agent.act();
  agent.act();

  expect(agent.returns).toEqual([30, 15]);
});

test('generates new population after each population is tested', () => {
  const policy = new Policy();

  const initialParameters = [-1, 1];
  const updatedParameters = [10, 20];
  policy.getParameters
    .mockReturnValue(initialParameters);

  const agent = new CMA_ES({
    policy,
    alpha: 0.5,
    std: 0.001,
    population: 10,
  });

  agent.updateParameters = jest.fn(() => updatedParameters);

  for (let episode = 0; episode < 10; episode += 1) {
    agent.newEpisode(new Environment());
  }
  expect(agent.returns.length).toBe(10);
  expect(agent.updateParameters).not.toBeCalled();

  const initialPopulation = agent.population;
  agent.newEpisode(new Environment());
  expect(agent.updateParameters).toBeCalled();

  const newPopulation = agent.population;
  expect(initialPopulation).not.toEqual(newPopulation);

  const parameters = policy.setParameters.mock.calls[10][0];
  expect(parameters.length).toBe(2);
  parameters.forEach((parameter, i) => {
    expect(parameter).toBe(updatedParameters[i] + newPopulation[0][i]);
  });

  expect(agent.returns).toEqual([0]);
});

test('updates parameters', () => {
  const policy = new Policy();

  const initialParameters = [-1, 1];

  const agent = new CMA_ES({
    policy,
    std: 0.001,
    population: 2,
    alpha: 0.5,
  });

  agent.parameters = initialParameters;
  agent.population = [[0.001, 0.002], [0.002, 0.004]];
  agent.returns = [10, -10];

  const newParameters = agent.updateParameters();

  expect(newParameters).toEqual([-3.5, -4]);
});
