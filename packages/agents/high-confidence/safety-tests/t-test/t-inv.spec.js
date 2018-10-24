const t_inv = require('./t-inv')

test('expect t-inv to compute the right thing', () => {
  const results = [1, 2, 3, 4, 5, 6].map(num => t_inv(0.99, num))
  // from https://www.mathworks.com/help/stats/tinv.html
  const expected = [31.8205, 6.9646, 4.5407, 3.7469, 3.3649, 3.1427]
  results.forEach((result, i) => expect(result).toBeCloseTo(expected[i], 3))
})
