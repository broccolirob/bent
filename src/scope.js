const _ = require("lodash");

function initWatchVal() {}
class Scope {
  constructor() {
    this.$$watchers = [];
  }

  $watch(watchFn, listenerFn) {
    let watcher = {
      watchFn,
      listenerFn: listenerFn || function() {},
      last: initWatchVal
    };
    this.$$watchers.push(watcher);
  }

  $digest() {
    let newValue, oldValue;
    _.forEach(this.$$watchers, watcher => {
      newValue = watcher.watchFn(this);
      oldValue = watcher.last;
      if (newValue !== oldValue) {
        watcher.last = newValue;
        watcher.listenerFn(
          newValue,
          oldValue === initWatchVal ? newValue : oldValue,
          this
        );
      }
    });
  }
}

module.exports = Scope;
