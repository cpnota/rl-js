/**
 * Create middleware for resolving MDP actions
 * to Redux actions.
 * Some MDPs have non-deterministic transition functions,
 * which means that for a given action,
 * there are many possible results.
 * However, Redux reducers should be completely determinstic.
 * Therefore, resolveAction should accept an MDP action,
 * resolve any non-determinism,
 * and return a Redux action that is handled deterministically
 * by the reducer.
 * @param {function} resolveAction - A function (state, mdpAction) => reduxAction
 * @returns Middleware for resolving an MDP action into a Redux action
 */
module.exports = resolveAction => store => next => action => (
  next(resolveAction(store.getState(), action))
);
