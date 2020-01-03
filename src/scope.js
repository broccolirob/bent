const _ = require("lodash");

class Scope {
  constructor() {
    this.$$watchers = [];
  }
  $watch(watchFn, listenerFn) {
    let watcher = {
      watchFn,
      listenerFn
    };
    this.$$watchers.push(watcher);
  }
  $digest() {
    _.forEach(this.$$watchers, watcher => {
      watcher.listenerFn();
    });
  }
}

module.exports = Scope;
