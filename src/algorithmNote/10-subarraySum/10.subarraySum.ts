function subarraySum(nums: number[], k: number): number {
    const map = new Map<number, number>();
    // 初始化 map，前缀和为 0 的情况出现 1 次
    // 这是为了处理从数组开头开始的子数组和为 k 的情况
    map.set(0, 1);

    let count = 0;
    let preSum = 0;

    for (const num of nums) {
        preSum += num;
        
        // 如果存在一个前缀和 preSum - k，说明中间有一段子数组和为 k
        if (map.has(preSum - k)) {
            count += map.get(preSum - k)!;
        }

        // 记录当前前缀和出现的次数
        map.set(preSum, (map.get(preSum) || 0) + 1);
    }

    return count;
};

export default subarraySum;
