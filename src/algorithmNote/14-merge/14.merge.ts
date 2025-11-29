function merge(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  // 按照区间的左端点排序
  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  
  for (const interval of intervals) {
    const L = interval[0], R = interval[1];
    
    // 如果列表为空，或者当前区间与上一区间不重合，直接添加
    if (merged.length === 0 || merged[merged.length - 1][1] < L) {
      merged.push([L, R]);
    } else {
      // 否则，我们将当前区间合并到上一区间
      // 更新上一区间的右端点，取两个区间右端点的最大值
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
    }
  }

  return merged;
}

export default merge;
