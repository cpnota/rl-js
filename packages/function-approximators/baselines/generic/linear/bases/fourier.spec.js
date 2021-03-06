const FourierBasis = require('./fourier');

it('computes features', () => {
  const basis = new FourierBasis({
    variables: 2,
    order: 1,
  });

  const features = basis.features([0.3, 0.4]);

  expect(features.length).toBe(8);
  expect(features[0]).toBeCloseTo(1);
  expect(features[1]).toBeCloseTo(0);
  expect(features[2]).toBeCloseTo(0.588, 3);
  expect(features[3]).toBeCloseTo(0.809, 3);
  expect(features[4]).toBeCloseTo(0.309, 3);
  expect(features[5]).toBeCloseTo(0.951, 3);
  expect(features[6]).toBeCloseTo(-0.588, 3);
});

const removePI = matr => matr.map(arr => arr.map(v => v / Math.PI));

describe('c', () => {
  it('computes c correctly for 2x0', () => {
    const basis = new FourierBasis({
      variables: 2,
      order: 0,
    });

    expect(basis.c).toEqual([[0, 0]]);
  });

  it('computes c correctly for 2x1', () => {
    const basis = new FourierBasis({
      variables: 2,
      order: 1,
    });

    expect(removePI(basis.c)).toEqual([[0, 0], [1, 0], [0, 1], [1, 1]]);
  });

  it('computes c correctly for 2x2', () => {
    const basis = new FourierBasis({
      variables: 2,
      order: 2,
    });

    expect(removePI(basis.c)).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  it('computes c correctly for 3x1', () => {
    const basis = new FourierBasis({
      variables: 3,
      order: 1,
    });

    expect(removePI(basis.c)).toEqual([
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ]);
  });
});

test('correct number of terms', () => {
  for (let order = 1; order < 4; order += 1) {
    for (let variables = 1; variables < 4; variables += 1) {
      const basis = new FourierBasis({
        order,
        variables,
      });

      expect(basis.c.length).toEqual((order + 1) ** variables);
      expect(basis.terms).toEqual(2 * ((order + 1) ** variables));
    }
  }
});
