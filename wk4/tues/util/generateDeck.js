function generateDeck() {
  const deck = [];
  const suites = ["Hearts", "Spades", "Clubs", "Diamonds"];
  suites.forEach((suite) => {
    for (let i = 1; i <= 13; i++) {
      deck.push({ suite: suite, value: i });
    }
  });
  return deck;
}

module.exports = generateDeck;
