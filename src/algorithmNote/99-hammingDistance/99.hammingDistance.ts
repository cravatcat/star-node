export function hammingDistance(x: number, y: number): number {
  let xor = x ^ y;
  let distance = 0;
  while (xor !== 0) {
    if (xor & 1) {
      distance++;
    }
    xor >>= 1;
  }
  return distance;
}
