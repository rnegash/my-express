const Layer = function(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  this.handle = fn;
  this.name = fn.name || "<anonymous>";
  this.path = undefined;
};

Layer.prototype.match = function(path) {
  return (
    (this.route && this.route.path === path) || this.name === "expressInit"
  );
};

Layer.prototype.handle_request = function(req, res, next) {
  const fn = this.handle;

  try {
    fn(req, res, next);
  } catch (e) {
    console.error(e);
  }
};

module.exports = Layer;
