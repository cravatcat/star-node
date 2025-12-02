// 简单实现最小堆和最大堆，或者使用数组排序模拟（不推荐，性能差）
// 为了演示算法核心，这里实现两个简单的堆类

class MinHeap {
  private heap: number[] = [];

  push(val: number) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number) {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

class MaxHeap {
  private heap: number[] = [];

  push(val: number) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const max = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return max;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] <= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number) {
    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
      if (largest === index) break;
      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}

export class MedianFinder {
  private minHeap: MinHeap; // 存储较大的一半
  private maxHeap: MaxHeap; // 存储较小的一半

  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
  }

  addNum(num: number): void {
    // 先加入最大堆
    this.maxHeap.push(num);
    // 将最大堆堆顶（最大值）移到最小堆
    this.minHeap.push(this.maxHeap.pop()!);

    // 保持平衡：最大堆的大小要么等于最小堆，要么比最小堆大 1
    if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.push(this.minHeap.pop()!);
    }
  }

  findMedian(): number {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek()!;
    } else {
      return (this.maxHeap.peek()! + this.minHeap.peek()!) / 2;
    }
  }
}
