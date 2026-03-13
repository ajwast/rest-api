const multiply = require("./multiply");

test("multiply 2 * 2 to equal 4", () => {
  expect(multiply(2, 2)).toBe(4);
});

test("multiply numbers as string types", () => {
  expect(multiply("2", "2")).toBe(4);
});

test("multiply NaN strings throws an error", () => {
  expect(() => multiply(1, "hello")).toThrow("Invalid input");
});
