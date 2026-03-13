/**
 * Checks if number is prime
 * @param {*} num - Number
 * @returns boolean
 */
function isPrime(num) {
  if (isNaN(Number(num))) {
    throw new Error("Invalid input");
  }
  if (num % 1) {
    return false;
  }
  if (num < 2) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

module.exports = isPrime;
