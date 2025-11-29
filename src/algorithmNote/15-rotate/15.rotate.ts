/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  const n = nums.length;
  k %= n; // 处理 k > n 的情况

  // 定义一个翻转辅助函数
  const reverse = (start: number, end: number) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  // 1. 翻转整个数组
  reverse(0, n - 1);
  // 2. 翻转前 k 个元素
  reverse(0, k - 1);
  // 3. 翻转剩余 n - k 个元素
  reverse(k, n - 1);
}

export default rotate;
