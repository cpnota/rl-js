const normalize = (min, max) => value => (value - min) / (max - min);

const normalizeWave = normalize(-1, 1);

module.exports = (params) => {
  const { maxVel1, maxVel2 } = params;
  const normalizeVel1 = normalize(-maxVel1, maxVel1);
  const normalizeVel2 = normalize(-maxVel2, maxVel2);

  return s => [
    normalizeWave(Math.cos(s[0])),
    normalizeWave(Math.sin(s[0])),
    normalizeWave(Math.cos(s[1])),
    normalizeWave(Math.sin(s[1])),
    normalizeVel1(s[2]),
    normalizeVel2(s[3]),
  ];
};
