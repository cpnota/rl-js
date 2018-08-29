// see: http://psthomas.com/papers/Konidaris2011a.pdf
const math = require('mathjs')
const { cartesianProduct } = require('js-combinatorics')
const Cache = require('../../../utils/cache')

class PolynomialBasis {
  constructor({ variables, order }) {
    if (order >= 10) throw new Error('Maximum order is 9')
    this.variables = variables
    this.order = order
    this.terms = Math.pow(this.order + 1, this.variables)
    this.c = this.computeC()

    this.cache = new Cache()
    this.features = this.cache.wrap(this.features.bind(this))
  }

  computeC() {
    const powerRange = math.range(0, this.order + 1).toArray()
    const possiblePowers = new Array(this.variables).fill(powerRange)
    return cartesianProduct(...possiblePowers).toArray()
  }

  features(x) {
    // eslint-disable-next-line camelcase
    return this.c.map(c_i => math.prod(...x.map((x_j, j) => x_j ** c_i[j])))
  }
}

module.exports = PolynomialBasis
