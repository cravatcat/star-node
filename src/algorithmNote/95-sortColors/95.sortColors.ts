/**
 Do not return anything, modify nums in-place instead.
 */
export function sortColors(nums: number[]): void {
  let p0 = 0; // 指向 0 的右边界
  let p2 = nums.length - 1; // 指向 2 的左边界
  let curr = 0; // 当前遍历指针

  while (curr <= p2) {
    if (nums[curr] === 0) {
      [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
      p0++;
      curr++;
    } else if (nums[curr] === 2) {
      [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
      p2--;
      // 这里 curr 不自增，因为交换回来的元素还需要判断
    } else {
      curr++;
    }
  }
}
