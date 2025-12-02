export function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    // 将 mid 与 right 比较
    if (nums[mid] > nums[right]) {
      // 如果 nums[mid] > nums[right]，说明最小值肯定在右半部分
      // 因为如果这一段是有序的，mid 应该小于 right
      // 出现 mid > right 说明旋转点在 [mid+1, right] 之间
      left = mid + 1;
    } else {
      // nums[mid] <= nums[right]
      // 说明右半部分是有序的，或者 mid 就是最小值
      // 旋转点在 [left, mid] 之间
      right = mid;
    }
  }
  return nums[left];
}
