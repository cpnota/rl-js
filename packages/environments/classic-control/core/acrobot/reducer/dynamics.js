const math = require('mathjs');

/* eslint-disable no-mixed-operators */

const dsdt = params => (sAugmented) => {
  // sAugmented is [...state, action]
  const {
    linkMass1: m1,
    linkMass2: m2,
    linkLength1: l1,
    linkCOMPos1: lc1,
    linkCOMPos2: lc2,
    linkMOI: I1,
    linkMOI: I2,
    g,
    bookOrNips,
  } = params;

  const [theta1, theta2, dtheta1, dtheta2, a] = sAugmented;

  const d1 = m1 * lc1 ** 2
    + m2 * (l1 ** 2 + lc2 ** 2 + 2 * l1 * lc2 * math.cos(theta2))
    + I1
    + I2;

  const d2 = m2 * (lc2 ** 2 + l1 * lc2 * math.cos(theta2)) + I2;

  const phi2 = m2 * lc2 * g * math.cos(theta1 + theta2 - Math.PI / 2.0);

  const phi1 = -m2 * l1 * lc2 * dtheta2 ** 2 * math.sin(theta2)
    - 2 * m2 * l1 * lc2 * dtheta2 * dtheta1 * math.sin(theta2)
    + (m1 * lc1 + m2 * l1) * g * math.cos(theta1 - Math.PI / 2)
    + phi2;

  const ddtheta2 = bookOrNips === 'nips'
    ? (a + d2 / d1 * phi1 - phi2)
        / (m2 * lc2 ** 2 + I2 - d2 ** 2 / d1)
    : (a
          + d2 / d1 * phi1
          - m2 * l1 * lc2 * dtheta1 ** 2 * math.sin(theta2)
          - phi2)
        / (m2 * lc2 ** 2 + I2 - d2 ** 2 / d1);

  const ddtheta1 = -(d2 * ddtheta2 + phi1) / d1;

  return [dtheta1, dtheta2, ddtheta1, ddtheta2, 0.0];
};

module.exports = dsdt;
