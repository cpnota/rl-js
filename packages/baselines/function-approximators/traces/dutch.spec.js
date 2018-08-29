const Tabular = require('../generic/tabular')
const DutchTraces = require('./dutch')

it('records traces, decays them by a set amount, and updates function approximator', () => {
  const tabular = new Tabular({ alpha: 0.1 })
  // initialize states
  tabular.call('0')
  tabular.call('1')

  const traces = new DutchTraces(tabular)
  traces.record('0')
  traces.record('0')
  traces.record('1')
  traces.decay(0.5)
  traces.update(10)

  expect(tabular.call('0')).toBeCloseTo(0.95, 4)
  expect(tabular.call('1')).toEqual(0.5)
})

it('constructor throws an error if constructed without alpha', () => {
  const tabular = new Tabular({ alpha: 0.1 })
  tabular.alpha = undefined
  expect(() => new DutchTraces(tabular)).toThrow('alpha')
})

it('constructor does not throws an error if alpha provided', () => {
  const tabular = new Tabular({ alpha: 0.1 })
  tabular.alpha = undefined
  expect(() => new DutchTraces(tabular, { alpha: 0.1 })).not.toThrow('alpha')
})
