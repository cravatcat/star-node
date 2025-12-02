export function decodeString(s: string): string {
  const stackMulti: number[] = [];
  const stackRes: string[] = [];
  let multi = 0;
  let res = '';

  for (const c of s) {
    if (c === '[') {
      stackMulti.push(multi);
      stackRes.push(res);
      multi = 0;
      res = '';
    } else if (c === ']') {
      let tmp = '';
      const curMulti = stackMulti.pop();
      if (curMulti !== undefined) {
        for (let i = 0; i < curMulti; i++) {
          tmp += res;
        }
      }
      res = (stackRes.pop() || '') + tmp;
    } else if (c >= '0' && c <= '9') {
      multi = multi * 10 + parseInt(c);
    } else {
      res += c;
    }
  }
  
  return res;
}
