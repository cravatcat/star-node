/**
 Do not return anything, modify matrix in-place instead.
 */
 export function setZeroes(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;

  // 使用两个集合分别记录需要置零的行号和列号
  // 这种方法空间复杂度为 O(m+n)，但逻辑比利用首行首列标记 O(1) 更直观
  const zeroRows = new Set<number>();
  const zeroCols = new Set<number>();

  // 1. 遍历矩阵，记录所有为 0 的位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        zeroRows.add(i);
        zeroCols.add(j);
      }
    }
  }

  // 2. 再次遍历矩阵，如果当前行或列在记录中，则置为 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (zeroRows.has(i) || zeroCols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
};
