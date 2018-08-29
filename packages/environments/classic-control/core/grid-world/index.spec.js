const Factory = require('./');

test('sanity check', () => {
  const factory = new Factory();
  const environment = factory.createEnvironment();
});
