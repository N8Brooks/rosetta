import {
  assertStrictEquals,
  assertThrows,
  it,
  readTestCases,
} from "../test_deps.ts";

const { "test-cases": TEST_CASES, "error-cases": ERROR_CASES } =
  (await readTestCases("fibonacci")) as {
    "test-cases": { input: number; output: string }[];
    "error-cases": { input: number }[];
  };

export function testTemplate(fibonacci: (n: number) => bigint) {
  for (const { input } of ERROR_CASES) {
    it(`${input}`, () => {
      assertThrows(() => fibonacci(input));
    });
  }

  for (const { input, output } of TEST_CASES) {
    it(`${input}`, () => {
      const expected = BigInt(output);
      const actual = fibonacci(input);
      assertStrictEquals(actual, expected);
    });
  }
}
