export function findKthLargest(nums: number[], k: number): number {
  // 使用快速选择算法 (Quick Select)
  const quickSelect = (left: number, right: number, k: number): number => {
    if (left === right) return nums[left];

    const pivotIndex = partition(left, right);

    if (k === pivotIndex) {
      return nums[k];
    } else if (k < pivotIndex) {
      return quickSelect(left, pivotIndex - 1, k);
    } else {
      return quickSelect(pivotIndex + 1, right, k);
    }
  };

  const partition = (left: number, right: number): number => {
    const pivot = nums[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
      // 如果要是第 K 大，我们通常按降序排，或者找第 N-K 小
      // 这里我们找的是第 N-K+1 小的元素，或者直接按降序排找第 K 个
      // 为了方便，我们这里实现降序排列的 partition
      if (nums[j] > pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
  };

  // 因为我们是降序排列，所以第 K 大元素的索引就是 k - 1
  return quickSelect(0, nums.length - 1, k - 1);
}
