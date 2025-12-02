export function longestValidParentheses(s: string): number {
  let maxLen = 0;
  const stack: number[] = [];
  stack.push(-1); // 放入一个参照物，表示最后一个未被匹配的右括号的下标（初始为 -1）

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i); // 更新参照物
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}
