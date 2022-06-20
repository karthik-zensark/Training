// function range(from, to) {
//   return Array(to - from + 1)
//     .fill(from)
//     .map((value, index) => {
//       value + index;
//     });
// }

const { range } = require("./modules");
const { reverseRange } = require("./modules");
console.log(range(1, 10));
console.log(reverseRange(1, 10));
