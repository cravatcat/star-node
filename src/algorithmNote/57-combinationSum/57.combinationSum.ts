export function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];

  function backtrack(startIndex: number, currentSum: number) {
    if (currentSum === target) {
      res.push([...path]);
      return;
    }

    if (currentSum > target) {
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      path.push(candidates[i]);
      // recursive call with i (not i + 1) because we can reuse the same element
      backtrack(i, currentSum + candidates[i]);
      path.pop();
    }
  }

  backtrack(0, 0);
  return res;
}
