const Policy = require('./');

const methods = [
  'chooseAction',
  'chooseBestAction',
  'probability',
  'update',
  'gradient',
  'trueGradient',
  'getParameters',
  'setParameters',
  'updateParameters',
];
const interfaceTest = require('../interface-test');

interfaceTest(Policy, methods);
