const Tabular = require('../generic/tabular');
const AccumulatingTraces = require('./accumulating');

it('records traces, decays them by a set amount, and updates function approximator', () => {
  const tabular = new Tabular({ alpha: 0.1 });
  // initialize states
  tabular.call('0');
  tabular.call('1');

  const traces = new AccumulatingTraces(tabular);
  traces.record('0');
  traces.record('0');
  traces.record('1');
  traces.decay(0.5);
  traces.update(10);

  expect(tabular.call('0')).toEqual(1);
  expect(tabular.call('1')).toEqual(0.5);
});
