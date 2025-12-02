export function countBits(n: number): number[] {
  const bits = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // i >> 1 相当于 i / 2，去掉最低位
    // i & 1 相当于 i % 2，获取最低位
    // 奇数比前一个偶数多一个 1（最低位），偶数和除以 2 后的数 1 的个数相同
    bits[i] = bits[i >> 1] + (i & 1);
  }
  return bits;
}
