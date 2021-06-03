const setPrototypeOf = require("setprototypeof");

const init = function(app) {
  return function expressInit(req, res, next) {
    setPrototypeOf(res, app.response);
    next();
  };
};

module.exports = init;
