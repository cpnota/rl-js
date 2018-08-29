const StateTraces = require('./');

const methods = ['record', 'update', 'decay', 'reset'];
const interfaceTest = require('../interface-test');

interfaceTest(StateTraces, methods);
