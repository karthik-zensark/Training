function range(from, to) {
  return Array(to - from + 1)
    .fill(from)
    .map((value, index) => {
      value + index;
    });
}

function reverseRange(from, to) {
  return Array(from - to + 1)
    .fill(from)
    .map((value, index) => {
      value - index;
    });
}

module.exports = { range, reverseRange };

// console.log(range(1, 10));
