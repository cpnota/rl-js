const ActionValueFunction = require('@rl-js/interfaces/action-value-function');

class TabularActionValueFunction extends ActionValueFunction {
  constructor({ stateValueFunctions = {}, createStateValueFunction, actions }) {
    super();
    this.stateValueFunctions = stateValueFunctions;
    this.createStateValueFunction = createStateValueFunction;
    Object.values(actions).forEach(action => this.getStateValueFunction(action));
  }

  call(state, action) {
    return this.getStateValueFunction(action).call(state);
  }

  update(state, action, error) {
    return this.getStateValueFunction(action).update(state, error);
  }

  gradient(state, action) {
    let partials = [];
    Object.keys(this.stateValueFunctions).forEach((a) => {
      const stateValueFunction = this.getStateValueFunction(a);
      if (a === action) {
        partials = partials.concat(stateValueFunction.gradient(state));
      } else {
        // zero out gradients from other actions
        partials = partials.concat(
          stateValueFunction.getParameters().map(() => 0),
        );
      }
    });
    return partials;
  }

  getParameters() {
    let parameters = [];
    Object.values(this.stateValueFunctions).forEach((stateValueFunction) => {
      parameters = parameters.concat(stateValueFunction.getParameters());
    });
    return parameters;
  }

  setParameters(parameters) {
    const p = parameters.slice();
    Object.values(this.stateValueFunctions).forEach((stateValueFunction) => {
      const stateValueParameters = p.splice(
        0,
        stateValueFunction.getParameters().length,
      );
      stateValueFunction.setParameters(stateValueParameters);
    });
    return this;
  }

  updateParameters(errors) {
    const e = errors.slice();
    Object.values(this.stateValueFunctions).forEach((stateValueFunction) => {
      const stateValueErrors = e.splice(
        0,
        stateValueFunction.getParameters().length,
      );
      stateValueFunction.updateParameters(stateValueErrors);
    });
    return this;
  }

  getStateValueFunction(action) {
    if (!this.stateValueFunctions[action]) {
      this.stateValueFunctions[action] = this.createStateValueFunction();
    }
    return this.stateValueFunctions[action];
  }
}

module.exports = TabularActionValueFunction;
