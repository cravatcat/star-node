function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  const map = new Map();
  let max = 1;

  for (const num of nums) {
    if (!map.has(num)) {
      const leftLen = map.get(num - 1) ?? 0;
      const rightLen = map.get(num + 1) ?? 0;
      const currentLen = leftLen + rightLen + 1;

      map.set(num, currentLen)
        .set(num - leftLen, currentLen)
        .set(num + rightLen, currentLen);

      max = Math.max(max, currentLen);
    }
  }

  return max;
};

export default longestConsecutive