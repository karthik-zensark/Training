// Basic default array methods.
// -> foreach
// -> filter
// -> map
// -> reduce

// foreach
list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

list1.forEach((inter, index) => {
  console.log(`element at ${index} is : ${inter}`);
});

// -----------------------------------------------------

// filter
const evens = list1.filter((number) => {
  return number % 2 === 0;
});

// console even numbers
console.log("\n", evens);

const odds = list1.filter((number) => {
  return number % 2 !== 0;
});

// console odd numbers
console.log("\n", odds);

// Using filter on strings.

names = ["john", "fred", "alpine", "ali", "alice"];

namesWithA = names.filter((name) => {
  return name.startsWith("A") || name.startsWith("a");
});

console.log("\n", namesWithA);
console.log("\n");

// -----------------------------------------------------------

// map
// map returns a value which is determined by a callback function
// whereas foreach doesn't return anything unless we return something explicitly.

list1.map((num) => {
  console.log(num);
});

// -------------------------------------------------------------------------

// reduce
let sum = 0;

// one way of obtaining the sum of numbers in a list.
list1.forEach((num) => {
  sum += num;
});

// second way using reduce.

// 0 is the initial value -> As the sum starts with 0;
// prev value is 0.
// curr value is 1 -> which is at index 0.
// then, prev value will become the return value and curr value will be the next value.
const redResult = list1.reduce((prev, curr) => {
  return prev + curr;
}, 0);

console.log("\n", redResult);

// --------------------------------------------------------

// using array methods to output an array with 1 to 100 numbers.
const one2Hundred = Array(100)
  .fill(0)
  // '_' is used to pass the linting rule.
  .map((_, index) => {
    return index + 1;
  })
  // return only multiples of 5.
  .filter((number) => {
    return number % 5 === 0;
  });

console.log("\n", one2Hundred);

// ------------------------------------------------------------------
