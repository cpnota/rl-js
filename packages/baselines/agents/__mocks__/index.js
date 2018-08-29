// mock to allow instansiation of interfaces directly as mocks
const interfaces = require('@rl-js/interfaces');

// walk the prototype chain to get all
// methods required for interface
const getAllRequiredMethods = (obj) => {
  if (obj.name === '') return [];
  return Object.getOwnPropertyNames(obj.prototype)
    .concat(getAllRequiredMethods(Object.getPrototypeOf(obj)))
    .filter(name => name !== 'constructor');
};

const mock = (Interface) => {
  const requiredMethods = getAllRequiredMethods(Interface);
  class Impl extends Interface {
    constructor() {
      super();
      requiredMethods.forEach(method => (this[method] = jest.fn()));
    }
  }

  requiredMethods.forEach(method => (Impl.prototype[method] = () => {}));

  return Impl;
};

const mocks = {};
Object.entries(interfaces).forEach(([name, Interface]) => {
  mocks[name] = mock(Interface);
});

module.exports = mocks;
