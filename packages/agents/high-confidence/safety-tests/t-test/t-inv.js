const jStat = require('jStat')

module.exports = (p, degreesOfFreedom) => {
  return jStat.studentt.inv(p, degreesOfFreedom)
}
