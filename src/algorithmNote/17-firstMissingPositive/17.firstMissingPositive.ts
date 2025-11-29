function firstMissingPositive(nums: number[]): number {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    // 1. nums[i] 必须在 [1, n] 范围内，否则它不可能是“缺失的第一个正数”在数组内的占位
    // 2. nums[i] 应该放在索引 nums[i] - 1 的位置上
    // 3. 如果 nums[i] 已经放在了正确的位置上 (即 nums[nums[i] - 1] === nums[i])，则不需要交换，避免死循环
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const targetIndex = nums[i] - 1;
      // 交换
      [nums[targetIndex], nums[i]] = [nums[i], nums[targetIndex]];
    }
  }

  // 再次遍历，寻找第一个不符合 nums[i] === i + 1 的位置
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // 如果所有位置都正确，说明数组是 [1, 2, ..., n]，则缺失的是 n + 1
  return n + 1;
}

export default firstMissingPositive;
