export function largestRectangleArea(heights: number[]): number {
  // 在数组首尾各添加一个 0，方便处理边界情况
  // 首位 0 保证栈内元素不为空（至少有 0）
  // 末位 0 保证最后能把栈内所有元素弹出计算
  const newHeights = [0, ...heights, 0];
  const stack: number[] = [0]; // 存储索引，初始放入哨兵
  let maxArea = 0;

  for (let i = 1; i < newHeights.length; i++) {
    // 如果当前高度小于栈顶高度，说明找到了右边界
    while (stack.length > 0 && newHeights[i] < newHeights[stack[stack.length - 1]]) {
      const curHeight = newHeights[stack.pop()!];
      const curWidth = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, curHeight * curWidth);
    }
    stack.push(i);
  }

  return maxArea;
}
