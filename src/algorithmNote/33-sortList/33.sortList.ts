
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

export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function sortList(head: ListNode | null): ListNode | null {
    // 1. Base case: 0 or 1 node
    if (!head || !head.next) {
        return head;
    }

    // 2. Split the list into two halves
    let slow: ListNode | null = head;
    let fast: ListNode | null = head.next;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    const mid = slow!.next;
    slow!.next = null; // Break the link

    // 3. Recursively sort each half
    const left = sortList(head);
    const right = sortList(mid);

    // 4. Merge the sorted halves
    return merge(left, right);
}

function merge(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    if (l1) {
        curr.next = l1;
    }
    if (l2) {
        curr.next = l2;
    }

    return dummy.next;
}
