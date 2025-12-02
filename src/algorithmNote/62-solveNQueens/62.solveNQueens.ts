export function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));
  
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // r - c
  const diag2 = new Set<number>(); // r + c

  function backtrack(row: number) {
    if (row === n) {
      res.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;
      }

      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      backtrack(row + 1);

      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0);
  return res;
}
