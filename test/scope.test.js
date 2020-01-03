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
  });
});
