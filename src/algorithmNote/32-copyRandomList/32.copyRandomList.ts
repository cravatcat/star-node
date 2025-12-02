
/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

export class Node {
    val: number
    next: Node | null
    random: Node | null
    constructor(val?: number, next?: Node, random?: Node) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
        this.random = (random===undefined ? null : random)
    }
}

export function copyRandomList(head: Node | null): Node | null {
    if (!head) return null;

    const map = new Map<Node, Node>();

    let curr: Node | null = head;
    // 1. 遍历链表，复制每个节点，并存入 map
    while (curr) {
        map.set(curr, new Node(curr.val));
        curr = curr.next;
    }

    curr = head;
    // 2. 再次遍历链表，构建新节点的 next 和 random 指向
    while (curr) {
        const newNode = map.get(curr);
        if (newNode) {
            newNode.next = curr.next ? map.get(curr.next) || null : null;
            newNode.random = curr.random ? map.get(curr.random) || null : null;
        }
        curr = curr.next;
    }

    return map.get(head) || null;
};
