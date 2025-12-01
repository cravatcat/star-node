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

export function detectCycle(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return null;
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // 1. 判断是否有环
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            // 2. 找到环的入口
            // 将 fast 指针重新指向头节点
            fast = head;
            // slow 和 fast 同时移动，每次一步，相遇点即为环入口
            while (slow !== fast) {
                slow = slow!.next;
                fast = fast!.next;
            }
            return slow;
        }
    }

    return null;
}
