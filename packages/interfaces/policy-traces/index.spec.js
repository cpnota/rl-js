const PolicyTraces = require('./');

const methods = ['record', 'update', 'decay', 'reset'];
const interfaceTest = require('../interface-test');

interfaceTest(PolicyTraces, methods);
