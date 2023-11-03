import {
  assertEquals,
  assertStrictEquals,
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
}
