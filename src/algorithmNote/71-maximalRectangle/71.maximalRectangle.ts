export function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const m = matrix.length;
  const n = matrix[0].length;
  const heights = new Array(n).fill(0);
  let maxArea = 0;

  // 复用 Largest Rectangle in Histogram 的逻辑
  const largestRectangleArea = (heights: number[]): number => {
    const newHeights = [0, ...heights, 0];
    const stack: number[] = [0];
    let max = 0;

    for (let i = 1; i < newHeights.length; i++) {
      while (stack.length > 0 && newHeights[i] < newHeights[stack[stack.length - 1]]) {
        const curHeight = newHeights[stack.pop()!];
        const curWidth = i - stack[stack.length - 1] - 1;
        max = Math.max(max, curHeight * curWidth);
      }
      stack.push(i);
    }
    return max;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        heights[j] += 1;
      } else {
        heights[j] = 0;
      }
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}
