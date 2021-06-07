const http = require("http");

const app = require("./app");
const Router = require("./router");

jest.mock("./router");

Router.mockImplementation(() => ({ use: jest.fn() }));
jest.mock("http", () => ({
  createServer: jest.fn(() => ({
    listen: jest.fn()
  }))
}));

const availableMethods = ["get", "post"];
jest.mock("methods", () => availableMethods);

describe("app", () => {
  describe("listen", () => {
    it("creates server", () => {
      app.listen();
      expect(http.createServer).toHaveBeenCalled();
    });
  });

  describe("lazyrouter", () => {
    it("creates a new router when `_router` is falsy", () => {
      app._router = false;
      app.lazyrouter();
      expect(Router).toHaveBeenCalled();
    });

    it("does not create a new router when `_router` is truthy", () => {
      app._router = true;
      app.lazyrouter();
      expect(Router).toHaveBeenCalled();
    });
  });

  it("adds available methods", () => {
    expect(typeof app[availableMethods[0]]).toBe("function");
  });
});
