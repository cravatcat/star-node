export function partition(s: string): string[][] {
  const res: string[][] = [];
  const path: string[] = [];

  function isPalindrome(str: string, left: number, right: number): boolean {
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  function backtrack(startIndex: number) {
    if (startIndex === s.length) {
      res.push([...path]);
      return;
    }

    for (let i = startIndex; i < s.length; i++) {
      if (isPalindrome(s, startIndex, i)) {
        const sub = s.substring(startIndex, i + 1);
        path.push(sub);
        backtrack(i + 1);
        path.pop();
      }
    }
  }

  backtrack(0);
  return res;
}
