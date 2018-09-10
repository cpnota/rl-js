const { vector } = require('.');

test('adds two vectors', () => {
  const v1 = [1, 2, 3];
  const v2 = [4, 5, 6];
  expect(vector.add(v1, v2)).toEqual([5, 7, 9]);
});

test('computes dot product of two vectors', () => {
  const v1 = [1, 2, 3];
  const v2 = [4, 5, 6];
  expect(vector.dot(v1, v2)).toEqual(32);
});

test('scales a vector', () => {
  expect(vector.scale(2, [1, 2, 3])).toEqual([2, 4, 6]);
});

test('adds a vector in place', () => {
  const v1 = [1, 2, 3];
  const v2 = [4, 5, 6];
  vector.inplace.add(v1, v2);
  expect(v1).toEqual([5, 7, 9]);
});

test('scales a vector in place', () => {
  const v1 = [1, 2, 3];
  vector.inplace.scale(2, v1);
  expect(v1).toEqual([2, 4, 6]);
});

test('updates a vector in a particular direction', () => {
  const v = [1, 2, 3];
  const direction = [10, 10, 10];
  const alpha = 0.1;
  vector.inplace.update(v, direction, alpha);
  expect(v).toEqual([2, 3, 4]);
});
