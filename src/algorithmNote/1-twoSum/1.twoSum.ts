function twoSum(nums: number[], target: number): number[] {
  let map = new Map(), n = nums.length;
  let ans: number[] = [];
  for (let i = 0; i < n; i++) {
    let diff = target - nums[i];
    if (map.has(diff)) {
      return [i, map.get(diff)];
    }
    map.set(nums[i], i);
  }
  return ans;
};

export default twoSum;