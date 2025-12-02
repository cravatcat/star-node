export function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const n = s.length;
  // dp[i] 表示字符串 s 的前 i 个字符 s[0...i-1] 是否可以被拆分
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; // 空字符串可以被拆分

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // 如果 s[0...j-1] 可以被拆分，且 s[j...i-1] 在字典中
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break; // 只要找到一种拆分方式即可
      }
    }
  }

  return dp[n];
}
