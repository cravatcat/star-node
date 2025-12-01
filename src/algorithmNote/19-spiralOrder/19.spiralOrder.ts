export function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0) return [];
  
  const res: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // 向右遍历
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    
    // 向下遍历
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;
    
    // 向左遍历 (检查是否还有行)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        res.push(matrix[bottom][i]);
      }
      bottom--;
    }
    
    // 向上遍历 (检查是否还有列)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        res.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return res;
}
