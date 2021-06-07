const parseUrl = require("parseurl");
const Route = require("./route");
const Layer = require("./layer");

const proto = function(options = {}) {
  const router = (req, res, next) => {
    router.handle(req, res, next);
  };
  Object.setPrototypeOf(router, proto);

  router.stack = [];

  return router;
};

proto.route = function(path) {
  const route = new Route(path);
  const layer = new Layer(path, {}, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);

  return route;
};

const getPathName = req => {
  try {
    return parseUrl(req).pathname;
  } catch (e) {
    return undefined;
  }
};

const matchLayer = (layer, path) => {
  try {
    return layer.match(path);
  } catch (e) {
    return e;
  }
};

proto.handle = function(req, res, out) {
  const stack = this.stack;
  let idx = 0;

  next();
  function next() {
    let match;
    let layer;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      const path = getPathName(req);
      match = matchLayer(layer, path);

      if (match !== true) {
        continue;
      }

      const route = layer.route;
      if (!route) {
        continue;
      }

      route.stack[0].handle_request(req, res, next);
    }

    if (match) {
      layer.handle_request(req, res, next);
    }
  }
};

proto.use = function(fn) {
  const layer = new Layer("/", {}, fn);
  layer.route = undefined;
  this.stack.push(layer);

  return this;
};

module.exports = proto;
