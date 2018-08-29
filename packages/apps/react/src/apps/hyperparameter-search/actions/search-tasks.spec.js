import { Linear } from '@rl-js/configuration/hyperparameters';
import { generateGridSearchTasks, generateRandomSearchTasks } from './search-tasks';

test('generates grid search tasks', () => {
  const definitions = [
    new Linear({
      name: 'alpha', min: 0, max: 0.2, default: 1,
    }),
    new Linear({
      name: 'epsilon', min: 0, max: 0.4, default: 1,
    }),
  ];

  const tasks = generateGridSearchTasks({
    definitions,
    trials: 3,
    episodes: 20,
    gridSize: 2,
    agent: { suite: 'test', id: 'agent' },
    environment: { suite: 'test', id: 'environment' },
  });

  expect(tasks.length).toEqual(12);
  expect(tasks[0]).toEqual({
    type: 'standard',
    payload: {
      agent: {
        id: 'agent',
        suite: 'test',
      },
      environment: {
        id: 'environment',
        suite: 'test',
      },
      episodes: 20,
      hyperparameters: {
        alpha: 0,
        epsilon: 0,
      },
    },
  });
});


test('generates random search tasks', () => {
  const definitions = [
    new Linear({
      name: 'alpha', min: 0, max: 0.2, default: 1,
    }),
    new Linear({
      name: 'epsilon', min: 0, max: 0.4, default: 1,
    }),
  ];

  const tasks = generateRandomSearchTasks({
    definitions,
    trials: 4,
    episodes: 20,
    samples: 10,
    agent: { suite: 'test', id: 'agent' },
    environment: { suite: 'test', id: 'environment' },
  });

  expect(tasks.length).toEqual(40);
  expect(tasks[0]).toEqual({
    type: 'standard',
    payload: {
      agent: {
        id: 'agent',
        suite: 'test',
      },
      environment: {
        id: 'environment',
        suite: 'test',
      },
      episodes: 20,
      hyperparameters: {
        alpha: tasks[0].payload.hyperparameters.alpha,
        epsilon: tasks[0].payload.hyperparameters.epsilon,
      },
    },
  });
});
