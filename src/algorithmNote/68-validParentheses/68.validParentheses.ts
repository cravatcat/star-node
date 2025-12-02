export function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char in map) {
      // 如果是右括号，检查栈顶元素是否匹配
      const topElement = stack.length > 0 ? stack.pop() : '#';
      if (map[char] !== topElement) {
        return false;
      }
    } else {
      // 如果是左括号，入栈
      stack.push(char);
    }
  }

  return stack.length === 0;
}
