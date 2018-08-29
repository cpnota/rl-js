module.exports = ({
  massCart, massPole, g, length,
}) => ({
  getAngularAcceleration: ({
    angularVelocity, force, theta,
  }) => {
    const coef = (-force
        - massPole * length * (angularVelocity ** 2) * Math.sin(theta))
      / (massCart + massPole);
    const numerator = g * Math.sin(theta) + Math.cos(theta) * coef;
    const denominator = length
      * (4 / 3 - massPole * (Math.cos(theta) ** 2) / (massCart + massPole));
    return numerator / denominator;
  },
  getAcceleration: ({
    theta, force, angularVelocity, angularAcceleration,
  }) => (
    (force
        + massPole
        * length
        * ((angularVelocity ** 2) * Math.sin(theta)
          - angularAcceleration * Math.cos(theta)))
      / (massCart + massPole)
  ),
});
