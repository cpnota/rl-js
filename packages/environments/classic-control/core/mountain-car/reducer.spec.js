const types = require('./types');
const reducer = require('./continuous/reducer');
const resolveAction = require('./resolve-action');

it('returns initial state', () => {
  expect(reducer(undefined, { type: 'none' })).toEqual({
    position: -0.5,
    velocity: 0,
  });
});

it("Executes 'zero'", () => {
  const state = reducer(undefined, resolveAction({}, types.zero));
  expect(state.position).toBeCloseTo(-0.5002, 4);
  expect(state.velocity).toBeCloseTo(-0.0002, 4);
});

it("executes 'forward'", () => {
  const state = reducer(undefined, resolveAction({}, types.forward));
  expect(state.position).toBeCloseTo(-0.4992, 4);
  expect(state.velocity).toBeCloseTo(0.0008, 4);
});

it("executes 'reverse'", () => {
  const state = reducer(undefined, resolveAction({}, types.reverse));
  expect(state.position).toBeCloseTo(-0.5012, 4);
  expect(state.velocity).toBeCloseTo(-0.0012, 4);
});
