const suite = require('.');

test('suite is defined', () => {
  expect(suite).toBeDefined();
});

const EnvironmentFactory = {
  getActions: () => ['left', 'right'],
  getObservationCount: () => 2,
};

suite.builders.forEach((builder) => {
  test(`${builder.getName()} compiles`, () => {
    builder
      .setEnvironmentFactory(EnvironmentFactory)
      .buildFactory()
      .createAgent();
  });
});
