import {
  takeEvery,
} from 'redux-saga/effects';
import configuration from '@rl-js/configuration';
import * as types from '../action-types';
import * as actions from '../actions';

export default (store, sagaMiddleware) => {
  const middleware = environmentStore => next => (action) => {
    const result = next(action);
    store.dispatch(actions.setEnvironmentState(environmentStore.getState()));
    return result;
  };

  function* saga() {
    yield takeEvery(types.START, () => {
      const config = store.getState();

      const environmentFactory = configuration
        .getEnvironmentSuite(config.environment.suite)
        .getEnvironmentBuilder(config.environment.id)
        .buildFactory();

      const agent = configuration
        .getAgentSuite(config.agent.suite)
        .getAgentBuilder(config.agent.id)
        .setEnvironmentFactory(environmentFactory)
        .setHyperparameters(config.hyperparameters)
        .buildAgent();

      environmentFactory.getMdpFactory().setReduxMiddleware([middleware]);
      let environment;

      const drawFrame = () => {
        if (!environment || environment.isTerminated()) {
          environment = environmentFactory.createEnvironment();
          agent.newEpisode(environment);
        } else {
          agent.act();
        }
        requestAnimationFrame(drawFrame);
      };

      requestAnimationFrame(drawFrame);
    });
  }

  sagaMiddleware.run(saga);
};
