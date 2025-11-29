function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let ans = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (height[left] < height[right]) {
      ans += leftMax - height[left];
      left++;
    } else {
      ans += rightMax - height[right];
      right--;
    }
  }

  return ans;
};

export default trap;