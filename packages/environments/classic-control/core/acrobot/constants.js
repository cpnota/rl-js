module.exports = {
  dt: 0.2,
  linkLength1: 1,
  linkLength2: 1,
  linkMass1: 1,
  linkMass2: 1,
  linkCOMPos1: 0.5, // position of the center of mass of link 1
  linkCOMPos2: 0.5, // position of the center of mass of link 2
  linkMOI: 1, // moments of inertia for both links
  maxVel1: 4 * Math.PI,
  maxVel2: 4 * Math.PI,
  torqueNoiseMax: 0,
  g: 9.8,
  bookOrNips: 'book',
  timeoutSeconds: 80,
};
