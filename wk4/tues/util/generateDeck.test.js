const generateDeck = require("./generateDeck");

const mockDeck = [
  { suite: "Hearts", value: 1 },
  { suite: "Hearts", value: 2 },
  { suite: "Hearts", value: 3 },
  { suite: "Hearts", value: 4 },
  { suite: "Hearts", value: 5 },
  { suite: "Hearts", value: 6 },
  { suite: "Hearts", value: 7 },
  { suite: "Hearts", value: 8 },
  { suite: "Hearts", value: 9 },
  { suite: "Hearts", value: 10 },
  { suite: "Hearts", value: 11 },
  { suite: "Hearts", value: 12 },
  { suite: "Hearts", value: 13 },
  { suite: "Spades", value: 1 },
  { suite: "Spades", value: 2 },
  { suite: "Spades", value: 3 },
  { suite: "Spades", value: 4 },
  { suite: "Spades", value: 5 },
  { suite: "Spades", value: 6 },
  { suite: "Spades", value: 7 },
  { suite: "Spades", value: 8 },
  { suite: "Spades", value: 9 },
  { suite: "Spades", value: 10 },
  { suite: "Spades", value: 11 },
  { suite: "Spades", value: 12 },
  { suite: "Spades", value: 13 },
  { suite: "Clubs", value: 1 },
  { suite: "Clubs", value: 2 },
  { suite: "Clubs", value: 3 },
  { suite: "Clubs", value: 4 },
  { suite: "Clubs", value: 5 },
  { suite: "Clubs", value: 6 },
  { suite: "Clubs", value: 7 },
  { suite: "Clubs", value: 8 },
  { suite: "Clubs", value: 9 },
  { suite: "Clubs", value: 10 },
  { suite: "Clubs", value: 11 },
  { suite: "Clubs", value: 12 },
  { suite: "Clubs", value: 13 },
  { suite: "Diamonds", value: 1 },
  { suite: "Diamonds", value: 2 },
  { suite: "Diamonds", value: 3 },
  { suite: "Diamonds", value: 4 },
  { suite: "Diamonds", value: 5 },
  { suite: "Diamonds", value: 6 },
  { suite: "Diamonds", value: 7 },
  { suite: "Diamonds", value: 8 },
  { suite: "Diamonds", value: 9 },
  { suite: "Diamonds", value: 10 },
  { suite: "Diamonds", value: 11 },
  { suite: "Diamonds", value: 12 },
  { suite: "Diamonds", value: 13 },
];

test("Check number of cards is 52", () => {
  const data = generateDeck();
  expect(data.length).toBe(52);
});

test("Check output against mock deck", () => {
  const data = generateDeck();
  expect(data).toEqual(mockDeck);
});

test("Check first card", () => {
  const data = generateDeck();
  expect(data[0]).toMatchObject(mockDeck[0]);
});
