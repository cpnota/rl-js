const reducer = require('./')(require('../constants'));

const testInitialState = [0, 0, 0, 0];

const step = (initialState = testInitialState, torque = 0) => reducer(initialState, {
  type: 'torque',
  payload: torque,
});

describe('acrobot reducer', () => {
  test('sets initial state', () => {
    const state = reducer(undefined, { type: 'none' });
    state.forEach((param) => {
      expect(Math.abs(param)).toBeLessThan(0.1);
      expect(param).not.toEqual(0);
    });
  });

  describe('sanity checks', () => {
    test('little to no motion when theta is 0', () => {
      step([0, 0, 0, 0]).forEach(param => expect(param).toBeCloseTo(0, 4));
    });

    test('little to no motion when theta is PI', () => {
      step([Math.PI, 0, 0, 0]).forEach(param => expect(param % Math.PI).toBeCloseTo(0, 4));
    });

    test('high effect from gravity when theta is PI/2', () => {
      const [v1, v2] = step([Math.PI / 2, 0, 0, 0]).slice(2);
      expect(v1).not.toBeCloseTo(0, 4);
      expect(v2).not.toBeCloseTo(0, 4);
    });

    describe('theta1', () => {
      test('stable equilibrium near theta1 = 0; theta > 0', () => {
        const theta11 = 0.05;
        const [theta12] = step([theta11, 0, 0, 0]);
        expect(theta12).toBeLessThan(theta11);
      });

      test('stable equilibrium near theta1 = 0; theta < 0', () => {
        const theta11 = -0.05;
        const [theta12] = step([theta11, 0, 0, 0]);
        expect(theta12).toBeGreaterThan(theta11);
      });

      test('unstable equilibrium near theta1 = PI; theta < PI', () => {
        const theta11 = Math.PI - 0.05;
        const [theta12] = step([theta11, 0, 0, 0]);
        expect(theta12).toBeLessThan(theta11);
      });

      test('unstable equilibrium near theta1 = PI; theta > PI', () => {
        const theta11 = -Math.PI + 0.05; // loops around
        const [theta12] = step([theta11, 0, 0, 0]);
        expect(theta12).toBeGreaterThan(theta11);
      });
    });

    describe('theta2', () => {
      test('stable equilibrium near theta2 = 0; theta2 > 0', () => {
        const theta21 = 0.05;
        const [theta22] = step([0, theta21, 0, 0]).slice(1);
        expect(theta22).toBeLessThan(theta21);
      });

      test('stable equilibrium near theta2 = 0; theta2 < 0', () => {
        const theta21 = -0.05;
        const [theta22] = step([0, theta21, 0, 0]).slice(1);
        expect(theta22).toBeGreaterThan(theta21);
      });

      test('unstable equilibrium near theta2 = PI; theta2 > PI', () => {
        const theta21 = -Math.PI + 0.05;
        const [theta22] = step([0, theta21, 0, 0]).slice(1);
        expect(theta22).toBeGreaterThan(theta21);
      });

      test('unstable equilibrium near theta2 = PI; theta2 < PI', () => {
        const theta21 = Math.PI - 0.05;
        const [theta22] = step([0, theta21, 0, 0]).slice(1);
        expect(theta22).toBeLessThan(theta21);
      });
    });
  });

  describe('torque', () => {
    test('negative torque', () => {
      expect(step(testInitialState, -1)).toEqual([
        0.013262967177227778,
        -0.03428722934738542,
        0.12866185280996087,
        -0.33450108998660183,
      ]);
    });

    test('positive torque', () => {
      expect(step(testInitialState, 1)).toEqual([
        -0.013262967177227795,
        0.03428722934738544,
        -0.12866185280996106,
        0.33450108998660194,
      ]);
    });
  });
});
