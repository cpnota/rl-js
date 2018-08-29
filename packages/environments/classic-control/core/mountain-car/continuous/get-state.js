const normalize = (min, max, value) => (value - min) / (max - min);

module.exports = ({ position, velocity }) => [
  normalize(-1.2, 0.5, position),
  normalize(-0.07, 0.07, velocity),
];
