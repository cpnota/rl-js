import _flatten from 'lodash/flatten';

const { cartesianProduct } = require('js-combinatorics');

export const generateGridSearchTasks = ({
  definitions, trials, episodes, gridSize, agent, environment,
}) => {
  const values = definitions.map(definition => (
    definition.discretize(gridSize).map(
      value => ({ [definition.getName()]: value }),
    )
  ));

  const tasks = cartesianProduct(...values)
    .toArray()
    .map(hyperparameters => ({
      type: 'standard',
      payload: {
        agent,
        environment,
        hyperparameters: Object.assign({}, ...hyperparameters),
        episodes,
      },
    }));

  return _flatten(new Array(trials).fill(tasks));
};

export const generateRandomSearchTasks = ({
  definitions, trials, episodes, samples, agent, environment,
}) => {
  const tasks = new Array(samples).fill(0)
    .map(() => ({
      type: 'standard',
      payload: {
        agent,
        environment,
        hyperparameters: Object.assign({}, ...definitions.map(definition => (
          { [definition.getName()]: definition.randomValue() }))),
        episodes,
      },
    }));

  return _flatten(new Array(trials).fill(tasks));
};


// export const generateRandomSearchTasks = (trialsPerVariable)
