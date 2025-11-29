export function minWindow(s: string, t: string): string {
  const need: Map<string, number> = new Map();
  const window: Map<string, number> = new Map();

  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0, right = 0;
  let valid = 0;
  let start = 0, len = Infinity;

  while (right < s.length) {
    const c = s[right];
    right++;

    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      const d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d)! - 1);
      }
    }
  }

  return len === Infinity ? "" : s.substring(start, start + len);
}
