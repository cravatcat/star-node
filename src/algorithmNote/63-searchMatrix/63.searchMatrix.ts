export function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix.length || !matrix[0].length) return false;
  
  const m = matrix.length;
  const n = matrix[0].length;
  
  // 将二维矩阵视为一个有序的一维数组进行二分查找
  // 范围是 [0, m * n - 1]
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // 将一维索引映射回二维坐标
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) {
      return true;
    } else if (val < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return false;
}
