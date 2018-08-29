const EnvironmentFactory = require('./');

const methods = ['createEnvironment'];
const interfaceTest = require('../interface-test');

interfaceTest(EnvironmentFactory, methods);
