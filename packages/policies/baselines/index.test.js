const helloWorld = require('.');

test('returns Hello World', () => {
  expect(helloWorld()).toEqual('Hello World');
});
