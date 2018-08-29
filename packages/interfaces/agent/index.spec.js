const Agent = require('./');

const methods = ['newEpisode', 'act'];
const interfaceTest = require('../interface-test');

interfaceTest(Agent, methods);
