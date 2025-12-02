class DListNode {
    key: number;
    value: number;
    prev: DListNode | null;
    next: DListNode | null;

    constructor(key?: number, value?: number) {
        this.key = key === undefined ? 0 : key;
        this.value = value === undefined ? 0 : value;
        this.prev = null;
        this.next = null;
    }
}

export class LRUCache {
    private capacity: number;
    private map: Map<number, DListNode>;
    private head: DListNode;
    private tail: DListNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map<number, DListNode>();
        
        // 使用虚拟头尾节点，简化边界处理
        this.head = new DListNode();
        this.tail = new DListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        if (!this.map.has(key)) {
            return -1;
        }

        // 存在该 key，将其移动到链表头部（表示最近使用）
        const node = this.map.get(key)!;
        this.moveToHead(node);
        return node.value;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            // 如果 key 已存在，更新 value，并移到头部
            const node = this.map.get(key)!;
            node.value = value;
            this.moveToHead(node);
        } else {
            // 如果 key 不存在，创建新节点
            const newNode = new DListNode(key, value);
            this.map.set(key, newNode);
            this.addToHead(newNode);

            // 检查是否超出容量
            if (this.map.size > this.capacity) {
                const removed = this.removeTail();
                this.map.delete(removed.key);
            }
        }
    }

    private addToHead(node: DListNode): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    private removeNode(node: DListNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    private moveToHead(node: DListNode): void {
        this.removeNode(node);
        this.addToHead(node);
    }

    private removeTail(): DListNode {
        const node = this.tail.prev!;
        this.removeNode(node);
        return node;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
