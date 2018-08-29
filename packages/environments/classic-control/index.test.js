const suites = require('.');

test('suites are defined', () => {
  expect(suites.discrete).not.toBeUndefined();
  expect(suites.tabular).not.toBeUndefined();
});
