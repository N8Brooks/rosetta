import { assertStrictEquals, it, readTestCases } from "../test_deps.ts";

const { ["test-case"]: TEST_CASES } = (await readTestCases("fibonacci")) as {
  "test-case": { input: number; output: string }[];
};

export function testTemplate(fibonacci: (n: number) => bigint) {
  for (const { input, output } of TEST_CASES) {
    it(`${input}`, () => {
      const expected = BigInt(output);
      const actual = fibonacci(input);
      assertStrictEquals(actual, expected);
    });
  }
}
