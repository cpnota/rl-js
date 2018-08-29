const { createStore, applyMiddleware } = require('redux');
const EnvironmentFactory = require('@rl-js/interfaces/environment-factory');
const mdpReducer = require('./reducer');
const createMiddleware = require('./middleware');
const ReduxMDP = require('./mdp');

/**
 * The underlying state representation of the environment.
 * Should be a serializable object,
 * e.g. state => JSON.parse(JSON.stringify(state)) should be an identity
 * @typedef {*} State
 */

/**
 * An object representing an action in an MDP.
 * The type is specific to the MDP.
 * @typedef {*} MdpAction
 */

/**
 * An object representing the observation of an agent
 * in the current state.
 * The type is specific to the MDP.
 * @typedef {*} Observation
 */

/**
 * An Redux action.
 * e.g. a Flux Standard Action: https://github.com/redux-utilities/flux-standard-action
 * Your MdpAction will be converted into a ReduxAction by resolveAction
 * @typedef {Object} ReduxAction
 * @property {string} type - Each action must have a type associated with it.
 * @property {*} [payload] - Any data associated with the action goes here
 * @property {boolean} [error] - Should be true IIF the action represents an error
 * @property {*} [meta] - Any data that is not explicitly part of the payload
 */

/**
 * A Redux reducer.
 * Computes the next state without mutating the previous state object
 * @typedef {function} reducer
 * @param {State} state - The current state of the MDP
 * @param {ReduxAction} action - The resolved action for the MDP
 * @returns {State} The new state object after the action is applied
 */

/**
 * A function to get the observation of the agent given the current state.
 * @typedef {function} getObservation
 * @param {State} state - The current state of the MDP
 * @returns {Observation} The observation for the current state
 */

/**
 * A function to compute the reward given a state transition,
 * i.e. (s, a, s).
 * This function should be completely deterministic;
 * any non-determinism should be handled by resolveAction.
 * @typedef {function} computeReward
 * @param {State} state - the current state for the MDP
 * @param {ReduxAction} action - The next action
 * @param {State} nextState - the next state for the mdp
 * @returns {number} The reward for given the state transition.
 */

/**
 * A function to compute whether the environment is terminated,
 * i.e. the current episode is over.
 * @typedef {function} isTerminated
 * @param {State} state - the current state for the MDP
 * @param {ReduxAction} action - The next action
 * @param {State} nextState - the next state for the MDP.
 * @param {number} time - The current timestep of the MDP, useful for finite horizon MDPs.
 * @returns {boolean} True if the environment is terminated, false otherwise.
 */

/**
 * A function to resolve a MdpAction into a ReduxAction.
 * Any non-determinism in your environment should go here,
 * as your Redux reducer should be completely deterministic.
 * @typedef {function} resolveAction
 * @param {State} state - the current state for the MDP
 * @param {MdpAction} action - The resolved action for the MDP
 * @returns {ReduxAction} The new state object after the action is applied
 */

/**
 * Class for constructing an Environment implemented as a ReduxMDP
 * @extends EnvironmentFactory
 */
class MdpFactory extends EnvironmentFactory {
  /**
   * Create a factory for a particular MDP
   * @param {object} params Parameters for constructing the MDP
   * @param {Reducer} params.reducer Redux reducer representing the state of the MDP
   * @param {getObservation} params.getObservation Compute the current observation
   * @param {computeReward} params.computeReward Compute the current reward
   * @param {isTerminated} params.isTerminated Compute whether the environment is terminated
   * @param {resolveAction} [params.resolveAction] Resolve the MdpAction into a ReduxAction
   * @param {number} [params.gamma=1] Reward discounting factor for the MDP
   */
  constructor({
    reducer,
    getObservation,
    computeReward,
    isTerminated,
    resolveAction = (s, a) => ({ type: a }),
    gamma = 1,
  }) {
    super();
    this.resolveAction = resolveAction;
    this.reducer = reducer;
    this.computeReward = computeReward;
    this.isTerminated = isTerminated;
    this.getObservation = getObservation;
    this.gamma = gamma;

    this.mdpMiddleware = [];
    this.reduxMiddleware = [];
  }

  /**
   * Create an instance of the environment.
   * @returns {ReduxMDP}
   */
  createEnvironment() {
    let mdp;

    const instrumentedMdpMiddleware = this.mdpMiddleware.map(
      middleware => () => next => action => (instrumentedMdpMiddleware.storeIsInitialized
        ? middleware(mdp)(next)(action)
        : next(action)),
    );

    instrumentedMdpMiddleware.storeIsInitialized = false;
    const store = this.createStore(instrumentedMdpMiddleware);
    instrumentedMdpMiddleware.storeIsInitialized = true;

    mdp = new ReduxMDP({
      store,
      getObservation: this.getObservation,
      gamma: this.gamma,
    });

    return mdp;
  }

  /**
   * Configure any MdpMiddleware that should be part of the next
   * invocation of createEnvironment()
   * @param {function} middleware
   */
  setMdpMiddleware(middleware) {
    this.mdpMiddleware = middleware || [];
  }

  /**
   * Configure any ReduxMiddleware that should be part of the next
   * invocation of createEnvironment()
   * @param {function} middleware
   */
  setReduxMiddleware(middleware) {
    this.reduxMiddleware = middleware || [];
  }

  createStore(instrumentedMdpMiddleware) {
    const store = createStore(
      mdpReducer(this.reducer, this.computeReward, this.isTerminated),
      applyMiddleware(
        ...instrumentedMdpMiddleware,
        createMiddleware(this.resolveAction),
        ...this.reduxMiddleware,
      ),
    );

    return store;
  }
}

module.exports = MdpFactory;
