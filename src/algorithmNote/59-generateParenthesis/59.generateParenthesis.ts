export function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  
  function backtrack(current: string, open: number, close: number) {
    if (current.length === n * 2) {
      res.push(current);
      return;
    }

    // We can add an opening parenthesis if we haven't used all n
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }

    // We can add a closing parenthesis if we have more open ones than closed ones
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }

  backtrack('', 0, 0);
  return res;
}
