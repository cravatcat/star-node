export function searchRange(nums: number[], target: number): number[] {
  const findFirst = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;
    let res = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        res = mid;
        right = mid - 1; // 继续向左找
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res;
  };

  const findLast = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;
    let res = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        res = mid;
        left = mid + 1; // 继续向右找
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res;
  };

  return [findFirst(nums, target), findLast(nums, target)];
}
