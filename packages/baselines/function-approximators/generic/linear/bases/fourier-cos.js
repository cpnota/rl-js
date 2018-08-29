const math = require('mathjs');
const { cartesianProduct } = require('js-combinatorics');
const Basis = require('../basis');
const Cache = require('../../../utils/cache');

class FourierCosBasis extends Basis {
  constructor({ variables, order }) {
    super();
    if (order >= 10) throw new Error('Maximum order is 9');
    this.variables = variables;
    this.order = order;
    this.terms = (this.order + 1) ** this.variables;
    this.c = this.computeC();

    this.cache = new Cache();
    this.features = this.cache.wrap(this.features.bind(this));
  }

  features(x) {
    /* eslint-disable camelcase */
    return this.c.map(c_i => Math.cos(Math.PI * math.dot(c_i, x)));
  }

  getNumberOfFeatures() {
    return this.terms;
  }

  computeC() {
    const powerRange = math.range(0, this.order + 1).toArray();
    const possiblePowers = new Array(this.variables).fill(powerRange);
    return cartesianProduct(...possiblePowers).toArray();
  }
}

module.exports = FourierCosBasis;
