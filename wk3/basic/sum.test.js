const sum = require("./sum");

test("Adds 1 and 3 should equial 4", () => {
  expect(sum(1, 3)).toBe(4);
});

test("Adds 5 and 4 should equial 9", () => {
  expect(sum(5, 4)).toBe(9);
});


test(" ", ()=>{
    expect(sum(2,3)).toStrictEqual
})