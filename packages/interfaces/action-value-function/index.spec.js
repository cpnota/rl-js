const ActionValueFunction = require('./');

const methods = [
  'call',
  'update',
  'gradient',
  'getParameters',
  'setParameters',
  'updateParameters',
];
const interfaceTest = require('../interface-test');

interfaceTest(ActionValueFunction, methods);
