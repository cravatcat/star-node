export function maximalSquare(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  let maxSide = 0;

  // dp[i][j] 表示以 (i, j) 为右下角的最大正方形的边长
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide;
}
