import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
  it,
  readTestCases,
} from "../test_deps.ts";
import { LinkedList } from "./linked_list.ts";

const TEST_CASES = (await readTestCases("linked_list")) as Record<
  string,
  TestCase
>;

type TestCase = Operation[];
type Operation =
  | { push: number; pop: never; iter: never }
  | { push: never; pop: number; iter: never }
  | { push: never; pop: never; iter: number[] };

export function testTemplate(createLinkedList: <T>() => LinkedList<T>) {
  for (const [name, testCase] of Object.entries(TEST_CASES)) {
    const list = createLinkedList();
    it(name, () => {
      for (const { push, pop, iter } of testCase) {
        if (push !== undefined) {
          list.push(push);
        } else if (pop !== undefined) {
          assertStrictEquals(list.pop(), pop);
        } else {
          assertEquals([...list], iter);
        }
      }
    });
  }

  it("pop from empty list", () => {
    const list = createLinkedList();
    assertThrows(() => list.pop());
  });

  it("fuzzing", () => {
    const list = createLinkedList();
    const expected: number[] = [];
    for (let i = 0; i < 1000; i++) {
      if (Math.random() < 0.5) {
        const data = Math.floor(Math.random() * 1000);
        expected.push(data);
        list.push(data);
      } else if (expected.length) {
        assertStrictEquals(list.pop(), expected.pop());
      } else {
        assertThrows(() => list.pop());
      }
      assertEquals([...list], expected);
    }
  });
}
