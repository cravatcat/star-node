function lengthOfLongestSubstring(s: string): number {
    const map = new Map<string, number>();
    let maxLen = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (map.has(char)) {
            // 更新左边界，注意只能向右移动，不能回退
            // 例如 "abba"，当遇到第二个 'a' 时，map.get('a') 是 0，但 left 已经是 2 了，不能回到 1
            left = Math.max(left, map.get(char)! + 1);
        }
        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};

export default lengthOfLongestSubstring;