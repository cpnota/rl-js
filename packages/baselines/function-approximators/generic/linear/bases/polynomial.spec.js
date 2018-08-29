const Polynomial = require('./polynomial')

test('computes c', () => {
  const basis = new Polynomial({
    order: 2,
    variables: 2
  })
  expect(basis.c).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2]
  ])
})

test('correct number of terms', () => {
  for (let order = 1; order < 4; order++) {
    for (let variables = 1; variables < 4; variables++) {
      const basis = new Polynomial({
        order,
        variables
      })

      expect(basis.c.length).toEqual((order + 1) ** variables)
      expect(basis.terms).toEqual((order + 1) ** variables)
    }
  }
})

test('computes correct features', () => {
  const basis = new Polynomial({
    order: 1,
    variables: 2
  })

  expect(basis.features([2, -3])).toEqual([1, 2, -3, -6])
})
