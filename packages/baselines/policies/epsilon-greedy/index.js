const Policy = require('@rl-js/interfaces/policy')
const math = require('mathjs')

class EpsilonGreedy extends Policy {
  constructor({ epsilon, actions, actionValueFunction }) {
    super()
    this.epsilon = epsilon
    this.actions = Object.values(actions)
    this.actionValueFunction = actionValueFunction
  }

  chooseAction(state) {
    return Math.random() > this.epsilon
      ? this.chooseBestAction(state)
      : this.chooseRandomAction()
  }

  chooseBestAction(state) {
    return math.pickRandom(this.getBestActions(state))
  }

  probability(state, action) {
    const bestActions = this.getBestActions(state, action)
    const probabilityRandom = this.epsilon / Object.keys(this.actions).length
    const probabilityBest = bestActions.includes(action)
      ? (1 - this.epsilon) / bestActions.length
      : 0
    return probabilityRandom + probabilityBest
  }

  chooseRandomAction() {
    return math.pickRandom(this.actions)
  }

  getBestActions(state) {
    let bestScore = -Number.MAX_VALUE
    let bestActions = []

    this.actions.forEach(action => {
      const score = this.actionValueFunction.call(state, action)
      if (score > bestScore) {
        bestScore = score
        bestActions = [action]
      } else if (score === bestScore) {
        bestActions.push(action)
      }
    })

    if (bestActions.length === 0) {
      throw new Error(
        JSON.stringify({
          message: 'No best action found. q probably returned NaN.',
          state
        })
      )
    }

    return bestActions
  }

  update(state, action, error) {
    return this.actionValueFunction.update(state, action, error)
  }

  gradient(state, action) {
    return this.actionValueFunction.gradient(state, action)
  }

  trueGradient(state, action) {
    return this.gradient(state, action) / this.probability(state, action)
  }

  getParameters() {
    return this.actionValueFunction.getParameters()
  }

  setParameters(parameters) {
    return this.actionValueFunction.setParameters(parameters)
  }

  updateParameters(errors) {
    this.actionValueFunction.updateParameters(errors)
  }
}

module.exports = EpsilonGreedy
