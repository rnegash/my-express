const http = require("http");
const mixin = require("merge-descriptors");
const proto = require("./app");

function createApplication() {
  const app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  const req = Object.create(http.IncomingMessage.prototype);
  const res = Object.create(http.ServerResponse.prototype);

  res.send = function(body) {
    switch (typeof body) {
      case "object":
        this.setHeader("Content-Type", "application/json");
        this.end(JSON.stringify(body), "utf-8");
        break;
      case "string":
        this.setHeader("Content-Type", "text/plain");
        this.end(JSON.stringify(body), "utf-8");
        break;
      default:
        return this;
    }
  };

  app.response = Object.create(res, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: app
    }
  });

  app.init();
  return app;
}

module.exports = createApplication;
