const init = app =>
  function expressInit(req, res, next) {
    Object.setPrototypeOf(res, app.response);
    next();
  };

module.exports = init;
