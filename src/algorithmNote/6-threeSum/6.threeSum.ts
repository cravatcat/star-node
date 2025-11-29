function threeSum(nums: number[]): number[][] {
  const len = nums.length;
  if (len < 3) return [];
  
  // 排序是关键，为了后续的双指针操作和去重
  nums.sort((a, b) => a - b);
  
  const ans: number[][] = [];
  
  for (let i = 0; i < len - 2; i++) {
    // 如果当前数字已经大于0，后面的数字也都大于0，不可能组成和为0的三元组
    if (nums[i] > 0) break;
    
    // 去重：如果当前数字和前一个数字相同，跳过
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = len - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        ans.push([nums[i], nums[left], nums[right]]);
        
        // 去重：跳过重复的左指针元素
        while (left < right && nums[left] === nums[left + 1]) left++;
        // 去重：跳过重复的右指针元素
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        // 和太小，需要更大的数，左指针右移
        left++;
      } else {
        // 和太大，需要更小的数，右指针左移
        right--;
      }
    }
  }
  return ans;
};

export default threeSum;