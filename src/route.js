const methods = require("methods");
const flatten = require("array-flatten");
const Layer = require("./layer");

const Route = function(path) {
  this.path = path;
  this.stack = [];
  this.methods = {};
};

Route.prototype.dispatch = (req, res, done) => {};

methods.forEach(function(method) {
  Route.prototype[method] = function() {
    const handles = flatten(Array.prototype.slice.call(arguments));

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];
      if (typeof handle !== "function") {
        const type = toString.call(handle);
        const msg = `Route.${method}() requires a callback function but got a ${type}`;
        throw new Error(msg);
      }

      const layer = new Layer("/", {}, handle);
      layer.method = method;
      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});

module.exports = Route;
