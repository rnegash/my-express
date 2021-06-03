const http = require("http");
const methods = require("methods");
const initMiddleware = require("./middleware/init");
const Router = require("./router");

const app = {
  init: function() {
    this.cache = {};
    this.engines = {};
    this.settings = {};
    this._router = undefined;
  },
  lazyrouter: function() {
    if (!this._router) {
      this._router = new Router({});
      this._router.use(initMiddleware(this));
    }
  }
};

app.listen = function() {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

app.handle = function(req, res, callback) {
  this._router.handle(req, res);
};

methods.forEach(function(method) {
  app[method] = function(path) {
    this.lazyrouter();

    const route = this._router.route(path);
    route[method].apply(route, Array.prototype.slice.call(arguments, 1));
    return this;
  };
});

module.exports = app;
