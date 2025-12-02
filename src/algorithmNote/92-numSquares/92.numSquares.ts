export function numSquares(n: number): number {
  // dp[i] 表示组成整数 i 最少需要的完全平方数个数
  const dp = new Array(n + 1).fill(n + 1);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
}
