const FunctionApproximator = require('@rl-js/interfaces/function-approximator')

class TabularFunctionApproximator extends FunctionApproximator {
  constructor({ alpha, defaultValues = undefined } = {}) {
    super()
    if (alpha == null) throw new Error('alpha must be defined')
    this.alpha = alpha
    this.values = new Map(defaultValues)
  }

  call(args) {
    if (!this.values.has(args)) {
      this.values.set(args, 0)
    }
    return this.values.get(args)
  }

  update(args, error) {
    if (isNaN(error)) throw new Error('Error was NaN')
    const currentValue = this.call(args)
    this.values.set(args, currentValue + this.alpha * error)
    return this
  }

  gradient(args) {
    const gradient = []
    for (const s of this.values.keys()) {
      s === args ? gradient.push(1) : gradient.push(0)
    }
    return gradient
  }

  getParameters() {
    return Array.from(this.values.values())
  }

  setParameters(values) {
    const keys = this.values.keys()
    values.forEach(value => this.values.set(keys.next().value, value))
    return this
  }

  updateParameters(errors) {
    const entries = this.values.entries()
    errors.forEach(e => {
      const [key, value] = entries.next().value
      this.values.set(key, value + this.alpha * e)
    })
    return this
  }

  getNumberOfWeights() {
    return this.values.size
  }

  updateWeights(errors) {
    const e = errors.slice().reverse()
    for (const s of this.values.keys()) {
      this.update(s, e.pop())
    }
  }

  createTraces() {
    return new Traces(this)
  }
}

module.exports = TabularFunctionApproximator
