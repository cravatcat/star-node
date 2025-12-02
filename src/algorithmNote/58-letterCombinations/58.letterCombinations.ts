export function letterCombinations(digits: string): string[] {
  if (digits.length === 0) {
    return [];
  }

  const map: { [key: string]: string } = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  const res: string[] = [];
  const path: string[] = [];

  function backtrack(index: number) {
    if (index === digits.length) {
      res.push(path.join(''));
      return;
    }

    const digit = digits[index];
    const letters = map[digit];

    for (const letter of letters) {
      path.push(letter);
      backtrack(index + 1);
      path.pop();
    }
  }

  backtrack(0);
  return res;
}
