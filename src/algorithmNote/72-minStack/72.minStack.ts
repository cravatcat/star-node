export class MinStack {
  private stack: number[];
  private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    // 如果 minStack 为空，或者 val 小于等于 minStack 栈顶元素，则入 minStack
    // 注意这里是 <=，如果有重复的最小值，也需要入栈
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const val = this.stack.pop();
    // 如果弹出的元素等于 minStack 栈顶元素，则 minStack 也弹出
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
