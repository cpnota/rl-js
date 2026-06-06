import {
  takeEvery,
} from 'redux-saga/effects';
import configuration from '@rl-js/configuration';
import * as types from '../action-types';
import * as actions from '../actions';

export default (store, sagaMiddleware) => {
  let animationFrame;

  const middleware = environmentStore => next => (action) => {
    const result = next(action);
    store.dispatch(actions.setEnvironmentState(environmentStore.getState(), action));
    return result;
  };

  function* saga() {
    yield takeEvery(types.START, () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

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

      const newEpisode = () => {
        environment = environmentFactory.createEnvironment();
        agent.newEpisode(environment);
        store.dispatch(actions.setEnvironmentState(environment.getStore().getState()));
      };

      const frameSkip = 1;
      let framesSkipped = 0;
      const drawFrame = () => {
        if (framesSkipped < frameSkip) {
          framesSkipped += 1;
          animationFrame = requestAnimationFrame(drawFrame);
          return animationFrame;
        }

        framesSkipped = 0;

        if (!environment || environment.isTerminated()) {
          newEpisode();
        } else {
          agent.act();
        }
        animationFrame = requestAnimationFrame(drawFrame);
        return animationFrame;
      };

      animationFrame = requestAnimationFrame(drawFrame);
    });
  }

  sagaMiddleware.run(saga);
};
