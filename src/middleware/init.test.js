const init = require("./init");

describe("init", () => {
  const mockApp = {};
  const initMiddleware = init(mockApp);

  it("returns named function `expressInit`", () => {
    expect(initMiddleware.name).toBe("expressInit");
  });
});
