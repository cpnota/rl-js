const {
  ActionValueFunction,
  ActionTraces,
  Agent,
  Environment,
  Policy
} = require('@rl-js/interfaces')
const checkInterface = require('check-interface')
const check = require('check-types')

module.exports = class QLearning extends Agent {
  constructor({
    actionValueFunction,
    policy,
    actionTraces,
    lambda,
    gamma = 1
  }) {
    super()
    this.actionValueFunction = checkInterface(
      actionValueFunction,
      ActionValueFunction
    )
    this.actionTraces = checkInterface(actionTraces, ActionTraces)
    this.policy = checkInterface(policy, Policy)
    this.lambda = check.assert.number(lambda)
    this.gamma = check.assert.number(gamma)
  }

  newEpisode(environment) {
    this.actionTraces.reset()
    this.environment = checkInterface(environment, Environment)
    this.state = this.environment.getObservation()
  }

  act() {
    this.action = this.policy.chooseAction(this.state)
    this.environment.dispatch(this.action)
    this.nextState = this.environment.getObservation()
    const tdError = this.getTDError()
    this.update(tdError)
    this.state = this.nextState
  }

  update(tdError) {
    this.actionTraces.record(this.state, this.action)
    this.actionTraces.update(tdError)
    this.actionTraces.decay(this.lambda * this.getGamma())
  }

  getTDError() {
    const nextEstimate = this.environment.isTerminated()
      ? 0
      : this.actionValueFunction.call(
          this.nextState,
          this.policy.chooseBestAction(this.nextState)
        )

    const estimate = this.actionValueFunction.call(this.state, this.action)

    return (
      this.environment.getReward() + this.getGamma() * nextEstimate - estimate
    )
  }

  getGamma() {
    return this.gamma
  }
}
