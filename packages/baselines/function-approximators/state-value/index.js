const StateValueFunction = require('@rl-js/interfaces/state-value-function')

class GenericStateValueFunction extends StateValueFunction {
  constructor(args) {
    super()

    if (!this.createFunctionApproximator) {
      throw new Error('must implement createFunctionApproximator')
    }

    this.fa = this.createFunctionApproximator(args)
  }

  call(state) {
    return this.fa.call(state)
  }

  update(state, error) {
    return this.fa.update(state, error)
  }

  gradient(state) {
    return this.fa.gradient(state)
  }

  getParameters() {
    return this.fa.getParameters()
  }

  setParameters(parameters) {
    return this.fa.setParameters(parameters)
  }

  updateParameters(errors) {
    return this.fa.updateParameters(errors)
  }
}

module.exports = GenericStateValueFunction
