export function fastDoubling(n: number): bigint {
  if (n < 0) {
    throw Error(`${n} is a negative number`);
  }
  if (n <= 1) {
    return 1n;
  }
  const m = Math.floor(n / 2);
  const a = fastDoubling(m - 1);
  const b = fastDoubling(m);
  return n % 2 ? (a + a + b) * b : a * a + b * b;
}
