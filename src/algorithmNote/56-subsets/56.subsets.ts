export function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];

  function backtrack(startIndex: number) {
    // Every node in the decision tree is a valid subset
    res.push([...path]);

    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return res;
}
