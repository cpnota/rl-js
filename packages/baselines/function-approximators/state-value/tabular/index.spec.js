const Tabular = require('./index')

test('default parameters', () => {
  expect(() => new Tabular()).toThrow('alpha')
})

test('returns default value if state is new', () => {
  const tabular = new Tabular({ alpha: 0.05 })
  expect(tabular.call('a')).toEqual(0)
})

test('approximates values for a given state', () => {
  const tabular = new Tabular({ alpha: 0.5 })
  tabular.update('a', 2)
  tabular.update('a', 3)
  expect(tabular.call('a')).toEqual(2.5)
})

test('approximates multiple states independently', () => {
  const tabular = new Tabular({ alpha: 0.5 })
  tabular.update('a', 1)
  tabular.update('b', 2)
  expect(tabular.call('a')).toEqual(0.5)
  expect(tabular.call('b')).toEqual(1)
})

test('updates weights', () => {
  const tabular = new Tabular({ alpha: 0.5 })
  tabular.update('a', 0)
  tabular.update('b', 0)
  tabular.updateParameters([2, 4])
  expect(tabular.call('a')).toEqual(1)
  expect(tabular.call('b')).toEqual(2)
})
