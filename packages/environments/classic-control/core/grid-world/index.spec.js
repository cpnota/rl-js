const Factory = require('./');

test('sanity check', () => {
  const factory = new Factory();
  factory.createEnvironment();
});
