export function findDuplicate(nums: number[]): number {
  let slow = 0;
  let fast = 0;

  // 1. 寻找相遇点 (Floyd's Tortoise and Hare)
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // 2. 寻找环的入口
  slow = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
