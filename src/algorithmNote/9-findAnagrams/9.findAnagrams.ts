function findAnagrams(s: string, p: string): number[] {
    const sLen = s.length;
    const pLen = p.length;
    const ans: number[] = [];

    if (sLen < pLen) return ans;

    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);

    // 统计 p 的字符计数，以及 s 中前 pLen 个字符的计数
    for (let i = 0; i < pLen; i++) {
        pCount[p.charCodeAt(i) - 97]++;
        sCount[s.charCodeAt(i) - 97]++;
    }

    // 检查初始窗口
    if (arraysEqual(pCount, sCount)) {
        ans.push(0);
    }

    // 滑动窗口
    for (let i = 0; i < sLen - pLen; i++) {
        // 移除窗口最左边的字符
        sCount[s.charCodeAt(i) - 97]--;
        // 加入窗口最右边的字符 (当前 i 是移除的，i + pLen 是新加入的)
        sCount[s.charCodeAt(i + pLen) - 97]++;

        // 检查当前窗口
        if (arraysEqual(pCount, sCount)) {
            ans.push(i + 1);
        }
    }

    return ans;
};

function arraysEqual(arr1: number[], arr2: number[]): boolean {
    for (let i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

export default findAnagrams;
