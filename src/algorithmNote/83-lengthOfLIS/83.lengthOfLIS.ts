export function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;

  // tails[i] 存储长度为 i+1 的最长递增子序列的末尾元素的最小值
  const tails: number[] = [];

  for (const num of nums) {
    let i = 0, j = tails.length;
    // 二分查找
    while (i < j) {
      const m = Math.floor((i + j) / 2);
      if (tails[m] < num) {
        i = m + 1;
      } else {
        j = m;
      }
    }
    if (i === tails.length) {
      tails.push(num);
    } else {
      tails[i] = num;
    }
  }

  return tails.length;
}
