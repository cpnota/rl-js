const AgentFactory = require('./');

const methods = ['createAgent'];
const interfaceTest = require('../interface-test');

interfaceTest(AgentFactory, methods);
