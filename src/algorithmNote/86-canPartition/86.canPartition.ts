export function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const n = nums.length;
  // dp[i] 表示是否可以凑成金额 i
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    // 从后往前遍历，避免重复使用同一个数字
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
}
