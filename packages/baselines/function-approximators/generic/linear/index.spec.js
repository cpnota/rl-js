const Linear = require('.');
const Fourier = require('./bases/fourier-cos');

const basis = new Fourier({ variables: 2, order: 1 });

test('call', () => {
  const fa = new Linear({ alpha: 0.1, basis });
  expect(fa.call([0, 1])).toEqual(0);
  fa.setParameters([1, 1, 0, 0]);
  expect(fa.call([0, 1])).toEqual(2);
});

test('update', () => {
  const fa = new Linear({ alpha: 0.1, basis });
  const args = [0, 1];
  expect(fa.call(args)).toEqual(0);
  fa.update(args, 10);
  expect(fa.call(args)).toEqual(0.1 * 10 * basis.getNumberOfFeatures());
});

test('gradient', () => {
  const fa = new Linear({ alpha: 0.1, basis });
  expect(fa.gradient([0, 1])).toEqual([1, 1, -1, -1]);
});

test('getParameters', () => {
  const fa = new Linear({ alpha: 0.1, basis });
  expect(fa.getParameters()).toEqual([0, 0, 0, 0]);
});

test('setParameters', () => {
  const fa = new Linear({ alpha: 0.1, basis });
  fa.setParameters([1, 2, 3, 4]);
  expect(fa.getParameters()).toEqual([1, 2, 3, 4]);
});

test('updatesParameters', () => {
  const fa = new Linear({ alpha: 0.1, basis });
  const args = [0, 1];
  fa.updateParameters([1, 2, 3, 4]);
  expect(fa.call(args)).toEqual(-0.4);
});
