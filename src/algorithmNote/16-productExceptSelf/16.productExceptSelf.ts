function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array(n);

  // answer[i] 表示索引 i 左侧所有元素的乘积
  // 因为索引 0 左侧没有元素，所以 answer[0] = 1
  answer[0] = 1;
  for (let i = 1; i < n; i++) {
    answer[i] = nums[i - 1] * answer[i - 1];
  }

  // R 为右侧所有元素的乘积
  // 刚开始右边没有元素，所以 R = 1
  let R = 1;
  for (let i = n - 1; i >= 0; i--) {
    // 对于索引 i，左边的乘积是 answer[i]，右边的乘积是 R
    answer[i] = answer[i] * R;
    // 更新 R，需要乘上当前元素 nums[i]
    R *= nums[i];
  }

  return answer;
}

export default productExceptSelf;
