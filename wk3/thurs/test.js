function reverseString(input) {
  let out = "";

  for (let i = input.length - 1; i > -1; i--) {
    out += input[i];
  }
  return out;
}

console.log(reverseString("hello world 123"));

function isPallindrome(input) {
  if (input === reverseString(input)) {
    return true;
  } else {
    return false;
  }
}

console.log(isPallindrome("racecar"));
