/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    // 让 fast 指针先移动 n 步
    for (let i = 0; i <= n; i++) {
        if (fast === null) return head; // 理论上 n 保证有效，这里防御一下
        fast = fast.next;
    }

    // 同时移动 fast 和 slow，直到 fast 到达末尾
    while (fast !== null) {
        fast = fast.next;
        slow = slow!.next;
    }

    // 此时 slow 指向倒数第 n+1 个节点，即待删除节点的前驱
    if (slow !== null && slow.next !== null) {
        slow.next = slow.next.next;
    }

    return dummy.next;
}
