const GenericStateValueFunction = require('../')
const TabularFunctionApproximator = require('../../generic/tabular')

class TabularStateValueFunction extends GenericStateValueFunction {
  constructor({ alpha, defaultValues = undefined }) {
    super({ alpha, defaultValues })
  }

  createFunctionApproximator(args) {
    return new TabularFunctionApproximator(args)
  }
}

module.exports = TabularStateValueFunction
