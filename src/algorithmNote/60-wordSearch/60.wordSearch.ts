export function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;

  function backtrack(i: number, j: number, k: number): boolean {
    if (k === word.length) {
      return true;
    }

    if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    const temp = board[i][j];
    board[i][j] = '#'; // Mark as visited

    const res = backtrack(i + 1, j, k + 1) ||
                backtrack(i - 1, j, k + 1) ||
                backtrack(i, j + 1, k + 1) ||
                backtrack(i, j - 1, k + 1);

    board[i][j] = temp; // Restore
    return res;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
}
