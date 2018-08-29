const Tabular = require('../generic/tabular');
const Linear = require('../generic/linear');
const ReplacingTraces = require('./replacing');

it('records traces, decays them by a set amount, and updates function approximator', () => {
  const tabular = new Tabular({ alpha: 0.1 });
  // initialize states
  tabular.call('0');
  tabular.call('1');

  const traces = new ReplacingTraces(tabular);
  traces.record('0');
  traces.record('0');
  traces.record('1');
  traces.decay(0.5);
  traces.update(10);

  expect(tabular.call('0')).toEqual(0.5);
  expect(tabular.call('1')).toEqual(0.5);
});

const basis = {
  features: features => features,
  getNumberOfFeatures: () => 1,
};

it('records only the partial if it is greater than the current traces', () => {
  const linear = new Linear({ alpha: 0.1, basis });
  const traces = new ReplacingTraces(linear);
  traces.record([1]);
  traces.record([1.5]);
  traces.update(10);
  expect(linear.call([1])).toEqual(1.5);
});

it('does not record the partial if it less than the current traces', () => {
  const linear = new Linear({ alpha: 0.1, basis });
  const traces = new ReplacingTraces(linear);
  traces.record([1.5]);
  traces.record([1]);
  traces.update(10);
  expect(linear.call([1])).toEqual(1.5);
});

it('records the sum if it is less than the trace but greater than the partial', () => {
  const linear = new Linear({ alpha: 0.1, basis });
  const traces = new ReplacingTraces(linear);
  traces.record([2]);
  traces.record([-0.5]);
  traces.update(10);
  expect(linear.call([1])).toEqual(1.5);
});

it('records the sum if it greater than the trace but less than the partial', () => {
  const linear = new Linear({ alpha: 0.1, basis });
  const traces = new ReplacingTraces(linear);
  traces.record([1]);
  traces.record([-2]);
  traces.update(10);
  expect(linear.call([1])).toEqual(-1);
});
