const Environment = require('./');

const methods = ['dispatch', 'getObservation', 'getReward', 'isTerminated'];
const interfaceTest = require('../interface-test');

interfaceTest(Environment, methods);
