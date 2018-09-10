const {
  StateValueFunction,
  Policy,
} = require('@rl-js/baseline-agents/__mocks__');
const CoagentNetwork = require('./');

test('constructor', () => {
  const inputLayer = new Array(3).fill().map(() => new Policy());
  const outputNode = new Policy();
  expect(() => new CoagentNetwork({
    inputLayer,
    outputNode,
    stateValueFunction: new StateValueFunction(),
  })).not.toThrow();
});
