import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
  it,
} from "../test_deps.ts";
import { IterableIteratorList } from "./iterable_iterator.ts";
import { testTemplate } from "./test_template.ts";

testTemplate(() => new IterableIteratorList());

it("pop from empty list", () => {
  const list = new IterableIteratorList();
  assertThrows(() => list.pop());
});

it("fuzzing", () => {
  const list = new IterableIteratorList<number>();
  const expected: number[] = [];
  for (let i = 0; i < 1000; i++) {
    if (Math.random() < 0.5) {
      const data = Math.floor(Math.random() * 1000);
      expected.push(data);
      list.push(data);
    } else if (expected.length) {
      assertStrictEquals(list.pop(), expected.pop());
    }
    assertEquals([...list], expected);
  }
});
