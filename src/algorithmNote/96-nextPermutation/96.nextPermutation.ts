/**
 Do not return anything, modify nums in-place instead.
 */
export function nextPermutation(nums: number[]): void {
  let i = nums.length - 2;
  
  // 1. 从后向前查找第一个相邻升序对 (i, i+1)，满足 nums[i] < nums[i+1]
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // 2. 如果找到了这样的 i，再从后向前查找第一个大于 nums[i] 的数 nums[j]
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
      j--;
    }
    // 3. 交换 nums[i] 和 nums[j]
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 4. 将 i+1 之后的区间翻转，使其变为升序
  reverse(nums, i + 1);
}

function reverse(nums: number[], start: number): void {
  let left = start;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}
