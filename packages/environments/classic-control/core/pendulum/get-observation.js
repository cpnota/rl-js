const TAU = 2 * Math.PI;
const normalize = (min, max, value) => (value - min) / (max - min);
const wrap = (theta) => {
  let bounded = theta % TAU;
  if (bounded < 0) {
    bounded = TAU + bounded;
  }
  return normalize(0, TAU, bounded);
};

module.exports = ({ theta, angularVelocity }) => [
  wrap(theta),
  normalize(-Math.PI, Math.PI, angularVelocity),
];
