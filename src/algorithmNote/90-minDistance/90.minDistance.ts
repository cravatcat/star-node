export function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] 表示 word1 的前 i 个字符转换成 word2 的前 j 个字符所使用的最少操作数
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 初始化
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // 删除
          dp[i][j - 1] + 1,    // 插入
          dp[i - 1][j - 1] + 1 // 替换
        );
      }
    }
  }

  return dp[m][n];
}
