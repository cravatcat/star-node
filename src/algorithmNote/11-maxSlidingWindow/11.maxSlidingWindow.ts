function maxSlidingWindow(nums: number[], k: number): number[] {
    if (nums.length === 0 || k === 0) return [];
    
    const deque: number[] = []; // 存储的是下标，不是值
    const result: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
        // 1. 移除队列中已经滑出窗口的元素（下标过小）
        if (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // 2. 维护单调递减队列
        // 如果当前元素 nums[i] 大于队列尾部的元素，说明队列尾部的元素不可能是最大值了，直接移除
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        // 3. 将当前元素下标加入队列
        deque.push(i);
        
        // 4. 记录当前窗口的最大值（队列头部元素）
        // 当窗口形成后（i >= k - 1），开始记录结果
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
};

export default maxSlidingWindow;
