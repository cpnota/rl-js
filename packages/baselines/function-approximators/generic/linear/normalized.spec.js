const NormalizedLinear = require('./normalized')
const Fourier = require('./bases/fourier')

it('updates normalized linear fa alpha 0.3', () => {
  const basis = new Fourier({
    variables: 1,
    order: 4
  })
  const linear = new NormalizedLinear({ alpha: 0.3, basis })
  expect(linear.call([0])).toEqual(0)
  linear.update([0], 1)
  expect(linear.call([0])).toEqual(0.3)
})
