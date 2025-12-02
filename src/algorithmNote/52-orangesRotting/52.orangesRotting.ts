export function orangesRotting(grid: number[][]): number {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  const queue: [number, number][] = [];
  let freshCount = 0;

  // Initialize queue with all rotten oranges and count fresh oranges
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        freshCount++;
      }
    }
  }

  // If no fresh oranges, return 0
  if (freshCount === 0) return 0;

  let minutes = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0 && freshCount > 0) {
    const size = queue.length;
    minutes++;

    for (let i = 0; i < size; i++) {
      const [currRow, currCol] = queue.shift()!;

      for (const [dr, dc] of dirs) {
        const newRow = currRow + dr;
        const newCol = currCol + dc;

        if (
          newRow >= 0 && newRow < m &&
          newCol >= 0 && newCol < n &&
          grid[newRow][newCol] === 1
        ) {
          grid[newRow][newCol] = 2; // Mark as rotten
          freshCount--;
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  return freshCount === 0 ? minutes : -1;
}
