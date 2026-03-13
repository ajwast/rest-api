function sum(num1, num2) {
  const result = Number(num1) + Number(num2);
  if (isNaN(result)) {
    throw new Error("Invalid input");
  }
  return result;
}

module.exports = sum;
