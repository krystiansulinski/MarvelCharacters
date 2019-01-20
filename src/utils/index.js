export function getGrouping(result, row, col) {
  let grouping = [];
  for (let i = 0; i < row; i++) {
    grouping[i] = [];
    for (let j = 0; j < col; j++) {
      grouping[i].push(result[i * row + j]);
    }
  }
  return grouping;
}
