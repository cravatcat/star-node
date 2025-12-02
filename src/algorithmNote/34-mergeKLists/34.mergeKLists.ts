
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

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.length === 0) return null;
    return merge(lists, 0, lists.length - 1);
}

function merge(lists: Array<ListNode | null>, left: number, right: number): ListNode | null {
    if (left === right) {
        return lists[left];
    }

    const mid = left + Math.floor((right - left) / 2);
    const l1 = merge(lists, left, mid);
    const l2 = merge(lists, mid + 1, right);

    return mergeTwoLists(l1, l2);
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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

    curr.next = l1 || l2;
    return dummy.next;
}
