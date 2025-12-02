export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 确保 nums1 是较短的数组，这样可以减少二分查找的范围
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;

  while (low <= high) {
    // partitionX 是 nums1 的分割点（表示左边有几个元素）
    const partitionX = Math.floor((low + high) / 2);
    // partitionY 是 nums2 的分割点
    // (m + n + 1) / 2 保证了左半部分元素的总数等于右半部分或者比右半部分多 1
    const partitionY = Math.floor((m + n + 1) / 2) - partitionX;

    // 边界处理：如果分割点在最左边，左边最大值为 -Infinity
    // 如果分割点在最右边，右边最小值为 Infinity
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];

    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];

    // 检查分割是否正确
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      // 找到了正确的分割点
      if ((m + n) % 2 === 0) {
        // 偶数个元素，中位数是左边最大值和右边最小值的平均值
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      } else {
        // 奇数个元素，中位数是左边最大值（因为左边比右边多一个）
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      // nums1 左边的太大，需要左移分割点
      high = partitionX - 1;
    } else {
      // nums1 左边的太小（或者 nums2 左边的太大），需要右移分割点
      low = partitionX + 1;
    }
  }
  
  throw new Error("Input arrays are not sorted or invalid.");
}
