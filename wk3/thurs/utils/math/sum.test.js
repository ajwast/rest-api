const sum = require("./sum");

test("add 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("add numbers as string types", () => {
  expect(sum("1", "2")).toBe(3);
});

test("adding NaN strings throws an error", () => {
  expect(() => sum(1, "hello")).toThrow("Invalid input");
});
