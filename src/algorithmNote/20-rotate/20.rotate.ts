/**
 Do not return anything, modify matrix in-place instead.
 */
export function rotate(matrix: number[][]): void {
  const n = matrix.length;

  // 1. 转置矩阵 (Transpose)
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 2. 翻转每一行 (Reverse each row)
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
