const TabularQ = require('./')
const TabularStateValueFunction = require('../../state-value/tabular')

const createStateValueFunction = () =>
  new TabularStateValueFunction({
    alpha: 1
  })

const actions = ['state', 'state2']

it('estimates default value for unknown state/action pairs', () => {
  const q = new TabularQ({ createStateValueFunction, actions })
  expect(q.call('state', 'action')).toEqual(0)
})

it('updates value for a given state/action pair', () => {
  const q = new TabularQ({ createStateValueFunction, actions })
  q.update('state', 'action', 3)
  expect(q.call('state', 'action')).toEqual(3)
})

it('computes the gradient', () => {
  const q = new TabularQ({ createStateValueFunction, actions })
  q.update('state', 'action', 3)
  q.update('state2', 'action', 4)
  q.update('state', 'action2', 2)
  expect(q.gradient('state2', 'action')).toEqual([0, 1, 0])
})

it('updates weights', () => {
  const q = new TabularQ({ createStateValueFunction, actions })
  q.update('state', 'action', 0)
  q.update('state2', 'action', 0)
  q.update('state', 'action2', 0)
  q.updateParameters([1, 2, 3])
  expect(q.call('state', 'action')).toEqual(1)
  expect(q.call('state2', 'action')).toEqual(2)
  expect(q.call('state', 'action2')).toEqual(3)
})
