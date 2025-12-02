export function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // 将 map 转换为数组，元素为 [num, count]
  const entries = Array.from(map.entries());

  // 使用快速选择算法或者简单的排序
  // 这里为了代码简洁，使用排序
  // 如果要求 O(n log k) 或 O(n)，可以使用最小堆或桶排序
  entries.sort((a, b) => b[1] - a[1]);

  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    res.push(entries[i][0]);
  }

  return res;
}
