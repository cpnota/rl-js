const { Policy } = require('../__mocks__');
const CompatibleBasis = require('./compatible-basis');

test('returns correct number of features', () => {
  const policy = new Policy();
  policy.getParameters.mockReturnValue([1, 2, 3]);
  const basis = new CompatibleBasis(policy);
  expect(basis.getNumberOfFeatures()).toEqual(3);
});

test('returns gradient of policy as features', () => {
  const policy = new Policy();
  policy.getParameters.mockReturnValue([1, 2, 3]);
  policy.gradient.mockReturnValue([10, 11, 12]);
  const basis = new CompatibleBasis(policy);
  expect(basis.features(['state', 'action'])).toEqual([10, 11, 12]);
  expect(policy.gradient).lastCalledWith('state', 'action');
});
