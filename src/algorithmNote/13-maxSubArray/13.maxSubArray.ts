function maxSubArray(nums: number[]): number {
  let pre = 0;
  let maxAns = nums[0];
  for (const x of nums) {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
  }
  return maxAns;
}

export default maxSubArray;
