const Linear = require('.')
const Fourier = require('./bases/fourier')

test('performs update', () => {
  const basis = new Fourier({
    variables: 1,
    order: 4
  })
  const linear = new Linear({ alpha: 0.1, basis })
  expect(linear.call([0])).toEqual(0)
  linear.update([0], 1)
  expect(linear.call([0])).toEqual(0.5)
})
