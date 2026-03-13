const isPrime = require("./isPrime");

test("Check if 7 is a prime number", () => {
  expect(isPrime(7)).toBe(true);
});

test("Check if 8 is a prime number", () => {
  expect(isPrime(8)).toBe(false);
});

test("Check if string type '7' is prime", () => {
  expect(isPrime("7")).toBe(true);
});

test("Check if type string NaN input throws an error", () => {
  expect(() => isPrime("string")).toThrow();
});

test("Check if returns false on boolean input", () => {
  expect(isPrime(true)).toBe(false);
});

test("Check float values return false", () => {
  expect(isPrime(2.3)).toBe(false);
});
