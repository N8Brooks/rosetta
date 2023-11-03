export function iterative(n: number) {
  let [a, b] = [0n, 1n];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
