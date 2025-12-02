export function maxProduct(nums: number[]): number {
  let maxF = nums[0];
  let minF = nums[0];
  let ans = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const mx = maxF, mn = minF;
    maxF = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
    minF = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
    ans = Math.max(maxF, ans);
  }

  return ans;
}
