const normalize = (min, max, value) => (value - min) / (max - min);

module.exports = ({
  x, velocity, theta, angularVelocity,
}) => [
  normalize(-2.4, 2.4, x),
  normalize(-Math.PI / 12, Math.PI / 12, theta),
  normalize(-10, 10, velocity),
  normalize(-Math.PI, Math.PI, angularVelocity),
];
