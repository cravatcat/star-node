export function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }
      
      path.push(nums[i]);
      used[i] = true;
      
      backtrack();
      
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return res;
}
