export function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  const m = matrix.length;
  const n = matrix[0].length;

  // 从右上角开始 (row = 0, col = n - 1)
  let row = 0;
  let col = n - 1;

  while (row < m && col >= 0) {
    const current = matrix[row][col];

    if (current === target) {
      return true;
    } else if (current > target) {
      // 如果当前值大于目标值，说明当前列下方的所有值都大于目标值（因为列是递增的）
      // 所以目标值肯定在左边，排除当前列
      col--;
    } else {
      // current < target
      // 如果当前值小于目标值，说明当前行左边的所有值都小于目标值（因为行是递增的）
      // 所以目标值肯定在下方，排除当前行
      row++;
    }
  }

  return false;
}
