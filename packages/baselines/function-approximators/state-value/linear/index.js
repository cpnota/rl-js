const GenericStateValueFunction = require('../')
const LinearFunctionApproximator = require('../../generic/linear')

class LinearStateValueFunction extends GenericStateValueFunction {
  constructor({ alpha, basis, initialWeights = undefined }) {
    super({ alpha, basis, initialWeights })
  }

  createFunctionApproximator(args) {
    return new LinearFunctionApproximator(args)
  }
}

module.exports = LinearStateValueFunction
