export function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack: number[] = []; // 单调栈，存储索引

  for (let i = 0; i < n; i++) {
    const temp = temperatures[i];
    // 当当前温度大于栈顶索引对应的温度时，说明找到了栈顶元素的下一个更高温度
    while (stack.length > 0 && temp > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop()!;
      res[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return res;
}
