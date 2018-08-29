const EnvironmentFactory = require('@rl-js/interfaces/environment-factory');
const MdpFactory = require('./index');

test('MdpFactory implements EnvironmentFactory interface', () => {
  expect(new MdpFactory({}) instanceof EnvironmentFactory).toBe(true);
});
