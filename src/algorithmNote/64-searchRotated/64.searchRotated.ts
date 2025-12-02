export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // 判断哪一部分是有序的
    // 注意：这里使用 <= 是因为当 left == mid 时（例如只剩两个元素），我们也认为左侧是有序的（或者说单个元素有序）
    if (nums[left] <= nums[mid]) {
      // 左半部分有序 [left, mid]
      // 如果 target 在左半部分范围内
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        // 否则去右半部分找
        left = mid + 1;
      }
    } else {
      // 右半部分有序 [mid, right]
      // 如果 target 在右半部分范围内
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        // 否则去左半部分找
        right = mid - 1;
      }
    }
  }
  
  return -1;
}
