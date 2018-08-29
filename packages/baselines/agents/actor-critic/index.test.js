const {
  StateValueFunction,
  PolicyTraces,
  Policy,
  Environment,
  StateTraces
} = require('../__mocks__/')
const ActorCritic = require('./')

describe('constructor', () => {
  test('constructs object', () => {
    expect(
      () =>
        new ActorCritic({
          stateValueFunction: new StateValueFunction(),
          stateTraces: new StateTraces(),
          stochasticPolicy: new Policy(),
          policyTraces: new PolicyTraces(),
          lambda: 0.5
        })
    ).not.toThrow()
  })

  const argNames = [
    'stateValueFunction',
    'stateTraces',
    'stochasticPolicy',
    'policyTraces',
    'lambda',
    'gamma'
  ]

  argNames.forEach(arg => {
    test(`throws error if ${arg} is not defined`, () => {
      const args = {
        stateValueFunction: new StateValueFunction(),
        stateTraces: new StateTraces(),
        stochasticPolicy: new Policy(),
        policyTraces: new PolicyTraces(),
        lambda: 0.5,
        gamma: 1
      }
      args[arg] = null
      expect(() => new ActorCritic(args)).toThrow(TypeError)
    })
  })
})

const initialize = () => {
  const stateValueFunction = new StateValueFunction()
  const stateTraces = new StateTraces()
  const stochasticPolicy = new Policy()
  const policyTraces = new PolicyTraces()
  const lambda = 0.5

  const agent = new ActorCritic({
    stateValueFunction,
    stateTraces,
    stochasticPolicy,
    policyTraces,
    lambda
  })

  const environment = new Environment()

  environment.getObservation
    .mockReturnValue(undefined)
    .mockReturnValueOnce('state1')
    .mockReturnValueOnce('state2')

  environment.getReward.mockReturnValue(10)

  environment.isTerminated.mockReturnValue(true).mockReturnValueOnce(false)

  stochasticPolicy.chooseAction
    .mockReturnValue(undefined)
    .mockReturnValueOnce('action1')
    .mockReturnValueOnce('action2')

  stateValueFunction.call.mockImplementation(state => {
    if (state === 'state1') return 1
    if (state === 'state2') return 2
    throw new Error('Unknown state')
  })

  return {
    agent,
    stateValueFunction,
    stateTraces,
    stochasticPolicy,
    policyTraces,
    environment,
    lambda
  }
}

test('newEpisode', () => {
  const { agent, policyTraces, stateTraces, environment } = initialize()
  agent.newEpisode(environment)
  expect(stateTraces.reset).toHaveBeenCalled()
  expect(policyTraces.reset).toHaveBeenCalled()
})

test('act', () => {
  const { agent, policyTraces, stateTraces, environment, lambda } = initialize()

  agent.newEpisode(environment)
  agent.act()

  expect(environment.dispatch).lastCalledWith('action1')
  expect(stateTraces.record).lastCalledWith('state1')
  expect(stateTraces.update).lastCalledWith(11)
  expect(stateTraces.decay).lastCalledWith(lambda)
  expect(policyTraces.record).lastCalledWith('state1', 'action1')
  expect(policyTraces.update).lastCalledWith(11)
  expect(policyTraces.decay).lastCalledWith(lambda)
})

test('terminal state', () => {
  const { agent, policyTraces, stateTraces, environment, lambda } = initialize()

  agent.newEpisode(environment)
  agent.act()
  agent.act()

  expect(environment.dispatch).lastCalledWith('action2')
  expect(stateTraces.record).lastCalledWith('state2')
  expect(stateTraces.update).lastCalledWith(8)
  expect(stateTraces.decay).lastCalledWith(lambda)
  expect(policyTraces.record).lastCalledWith('state2', 'action2')
  expect(policyTraces.update).lastCalledWith(8)
  expect(policyTraces.decay).lastCalledWith(lambda)
})
