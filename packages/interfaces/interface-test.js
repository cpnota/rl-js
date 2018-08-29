module.exports = (Interface, methods) => {
  test('Allows proper instansiation of subclass', () => {
    class Impl extends Interface {}
    methods.forEach((method) => { Impl.prototype[method] = () => {}; });
    expect(() => new Impl()).not.toThrow();
  });

  test(`Throws an error if user attempts to instansiate ${
    Interface.name
  } directly`, () => {
    expect(() => new Interface()).toThrow('implemented');
  });

  methods.forEach((method) => {
    test(`Throws an error if subclass is missing "${method}"`, () => {
      class Impl extends Interface {}
      methods
        .filter(m => m !== method)
        .forEach((m) => { Impl.prototype[m] = () => {}; });
      expect(() => new Impl()).toThrow(method);
    });
  });
};
