export function getGrouping(result, row, col) {
  let grouping = [];
  for (let i = 0; i < row; i++) {
    grouping[i] = [];
    for (let j = 0; j < col; j++) {
      grouping[i].push(result[i * (row + 1) + j]);
    }
  }
  return grouping;
}

export function getRandomLetter() {
  return String.fromCodePoint(getRandomInt("a".codePointAt(0), "z".codePointAt(0)));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
