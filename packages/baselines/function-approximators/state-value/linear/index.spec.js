const Linear = require('./')

const basis = {
  features: state => state.map(f => f / 2).slice(0, 2), // some fake features
  getNumberOfFeatures: () => 2
}

test('computes the gradient for a given state', () => {
  const approximator = new Linear({ basis })
  expect(approximator.gradient([4, 6])).toEqual([2, 3])
})

test('updates the weights', () => {
  const approximator = new Linear({ basis, alpha: 0.5 })
  approximator.updateParameters([2, 4])
  expect(approximator.getParameters()).toEqual([1, 2])
  approximator.updateParameters([6, 2])
  expect(approximator.getParameters()).toEqual([4, 3])
})
