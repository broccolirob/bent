let Scope = require("../src/scope");

describe("Scope", () => {
  it("can be constructed and used as an object", () => {
    let scope = new Scope();
    scope.aProperty = "hello";
    expect(scope.aProperty).toBe("hello");
  });

  describe("digest", () => {
    let scope;

    beforeEach(() => {
      scope = new Scope();
    });

    it("calls the listener function of a watcher on first $digest", () => {
      let watchFn = () => "wat";
      let listenerFn = jest.fn();
      scope.$watch(watchFn, listenerFn);
      scope.$digest();
      expect(listenerFn).toHaveBeenCalled();
    });

    it("calls the watch function with the scope as the argument", () => {
      let watchFn = jest.fn();
      let listenerFn = () => null;
      scope.$watch(watchFn, listenerFn);
      scope.$digest();
      expect(watchFn).toHaveBeenCalledWith(scope);
    });

    it("calls the listener function when the watch value changes", () => {
      scope.someValue = "a";
      scope.counter = 0;
      scope.$watch(
        scope => scope.someValue,
        (newValue, oldValue, scope) => scope.counter++
      );
      expect(scope.counter).toBe(0);
      scope.$digest();
      expect(scope.counter).toBe(1);
      scope.$digest();
      expect(scope.counter).toBe(1);
      scope.someValue = "b";
      expect(scope.counter).toBe(1);
      scope.$digest();
      expect(scope.counter).toBe(2);
    });
  });
});
