module.exports = ({
  massCart, massPole, g, length, forceMagnitude, dt,
}) => ({
  getAngularAcceleration: ({
    velocity, angularVelocity, force, theta,
  }) => {
    const coef = (-force
        - massPole * length * Math.pow(angularVelocity, 2) * Math.sin(theta))
      / (massCart + massPole);
    const numerator = g * Math.sin(theta) + Math.cos(theta) * coef;
    const denominator = length
      * (4 / 3 - massPole * Math.pow(Math.cos(theta), 2) / (massCart + massPole));
    return numerator / denominator;
  },
  getAcceleration: ({
    theta, force, angularVelocity, angularAcceleration,
  }) => (
    (force
        + massPole
        * length
        * (Math.pow(angularVelocity, 2) * Math.sin(theta)
          - angularAcceleration * Math.cos(theta)))
      / (massCart + massPole)
  ),
});
