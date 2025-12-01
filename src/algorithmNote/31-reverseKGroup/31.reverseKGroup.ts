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
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (!head || k === 1) return head;

    const dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;
    let end = dummy;

    while (end.next !== null) {
        // Move end k steps forward
        for (let i = 0; i < k && end !== null; i++) {
            end = end.next!;
        }
        if (end === null) break;

        let start = pre.next!;
        let next = end.next;
        
        end.next = null; // Break the link
        pre.next = reverse(start); // Reverse the group
        start.next = next; // Connect the tail of reversed group to the next part
        
        pre = start; // Move pre to the end of the reversed group
        end = pre; // Reset end to pre
    }

    return dummy.next;
}

function reverse(head: ListNode): ListNode {
    let pre: ListNode | null = null;
    let curr: ListNode | null = head;
    while (curr !== null) {
        let next: ListNode | null = curr.next;
        curr.next = pre;
        pre = curr;
        curr = next;
    }
    return pre!;
}
