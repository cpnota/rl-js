const resolveAction = require('./resolve-action');
const types = require('./types');
const { throttle } = require('./continuous/types');

test('resolves forward action', () => {
  expect(resolveAction({}, types.forward)).toEqual({
    type: throttle,
    payload: 0.001,
  });
});

test('resolves reverse action', () => {
  expect(resolveAction({}, types.reverse)).toEqual({
    type: throttle,
    payload: -0.001,
  });
});

test('resolves zero action', () => {
  expect(resolveAction({}, types.backward)).toEqual({
    type: throttle,
    payload: 0,
  });
});
