export function coinChange(coins: number[], amount: number): number {
  // dp[i] 表示凑成金额 i 所需的最少硬币数
  // 初始化为 amount + 1，表示无法凑成（因为最多也就是 amount 个 1 元硬币）
  const dp = new Array(amount + 1).fill(amount + 1);

  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
}
