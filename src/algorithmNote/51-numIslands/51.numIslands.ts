export function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) {
    return 0;
  }

  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(grid, i, j, m, n);
      }
    }
  }

  return count;
}

function dfs(grid: string[][], i: number, j: number, m: number, n: number) {
  // Check boundary conditions and if current cell is water ('0')
  if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') {
    return;
  }

  // Mark current cell as visited by setting it to '0'
  grid[i][j] = '0';

  // Visit neighbors (up, down, left, right)
  dfs(grid, i - 1, j, m, n);
  dfs(grid, i + 1, j, m, n);
  dfs(grid, i, j - 1, m, n);
  dfs(grid, i, j + 1, m, n);
}
