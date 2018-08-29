const ActionTraces = require('./');

const methods = ['record', 'update', 'decay', 'reset'];
const interfaceTest = require('../interface-test');

interfaceTest(ActionTraces, methods);
