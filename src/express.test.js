const createApplication = require("./express");

describe("express", () => {
  it("is a function", () => {
    const express = createApplication();

    expect(typeof express).toBe("function");
  });

  describe("creating routes", () => {
    it("creates new routes succesfully", () => {
      const express = createApplication();
      const route = express.get("/test", () => res.send("hello"));

      const hasRoute = route._router.stack.some(
        layer => layer.route && layer.route.path === "/test"
      );
      expect(hasRoute).toBe(true);
    });
  });
});
