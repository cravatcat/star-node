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

export function isPalindrome(head: ListNode | null): boolean {
    if (head === null || head.next === null) {
        return true;
    }

    // 1. 找到前半部分链表的尾节点并反转后半部分链表
    const firstHalfEnd = endOfFirstHalf(head);
    const secondHalfStart = reverseList(firstHalfEnd!.next);

    // 2. 判断是否回文
    let p1: ListNode | null = head;
    let p2: ListNode | null = secondHalfStart;
    let result = true;
    while (result && p2 !== null) {
        if (p1!.val !== p2.val) {
            result = false;
        }
        p1 = p1!.next;
        p2 = p2.next;
    }

    // 3. 还原链表并返回结果
    firstHalfEnd!.next = reverseList(secondHalfStart);
    return result;
}

const reverseList = (head: ListNode | null): ListNode | null => {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;
    while (curr !== null) {
        let nextTemp: ListNode | null = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}

const endOfFirstHalf = (head: ListNode): ListNode | null => {
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;
    while (fast!.next !== null && fast!.next.next !== null) {
        fast = fast!.next.next;
        slow = slow!.next;
    }
    return slow;
}
