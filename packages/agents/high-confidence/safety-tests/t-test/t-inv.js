const jStat = require('jStat');

module.exports = (p, degreesOfFreedom) => jStat.studentt.inv(p, degreesOfFreedom);
