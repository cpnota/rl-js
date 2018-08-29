const math = require('mathjs');
const { cartesianProduct } = require('js-combinatorics');
const Basis = require('../basis');
const Cache = require('../../../utils/cache');

/**
 * The Full Fourier basis, including both sin and cos waves
 * of each frequency.
 * see: http://psthomas.com/papers/Konidaris2011a.pdf
 * @class
 * @extends Basis
 */
class FourierBasis extends Basis {
  constructor({ variables, order }) {
    super();
    if (order >= 10) throw new Error('Maximum order is 9');
    this.variables = variables;
    this.order = order;
    this.terms = 2 * ((this.order + 1) ** this.variables);
    this.c = this.computeC();

    this.cache = new Cache();
    this.features = this.cache.wrap(this.features.bind(this));
  }

  features(x) {
    const features = [];
    /* eslint-disable camelcase */
    this.c.forEach((c_i) => {
      features.push(Math.cos(Math.PI * math.dot(c_i, x)));
      features.push(Math.sin(Math.PI * math.dot(c_i, x)));
    });
    return features;
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

module.exports = FourierBasis;
