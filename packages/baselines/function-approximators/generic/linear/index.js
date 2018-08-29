const LinearFunctionApproximator = require('./standard')
const cachify = require('../../utils/cachify')
module.exports = cachify(LinearFunctionApproximator)
