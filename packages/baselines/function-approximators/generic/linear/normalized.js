const math = require('mathjs')
const Linear = require('./standard')
const cachify = require('../../utils/cachify')

class NormalizedLinear extends Linear {
  update(args, error) {
    const features = this.basis.features(args)
    this.weights = math.add(
      this.weights,
      math.multiply(
        this.alpha,
        error,
        math.divide(features, math.norm(features, 1))
      )
    )
    return this
  }
}

module.exports = cachify(NormalizedLinear)
