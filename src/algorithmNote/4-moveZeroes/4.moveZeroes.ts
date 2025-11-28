/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let i = 0, j = 0;
  while (j < nums.length) {
    if (nums[j] !== 0) {
      if (i !== j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
      i++;
    }
    j++;
  }
};

export default moveZeroes;