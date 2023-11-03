import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from "./test_deps.ts";
import { LinkedList } from "./linked_list.ts";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  describe("append", () => {
    it("should append items to the LinkedList", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      assertEquals([...list], [1, 2, 3]);
    });
  });

  describe("pop", () => {
    it("should pop all items from the LinkedList", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      assertStrictEquals(list.pop(), 3);
      assertEquals([...list], [1, 2]);
      assertStrictEquals(list.pop(), 2);
      assertEquals([...list], [1]);
      assertStrictEquals(list.pop(), 1);
      assertEquals([...list], []);
    });

    it("should maintain links between nodes", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.pop();
      assertEquals([...list], [1, 2]);
      list.push(4);
      assertEquals([...list], [1, 2, 4]);
    });

    it("should handle an empty list when popping", () => {
      assertThrows(() => list.pop());
    });
  });

  describe("iterator", () => {
    it("should create an empty LinkedList", () => {
      assertEquals([...list], []);
    });

    it("should iterate correctly using the Symbol.iterator", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      const it = list[Symbol.iterator]();
      assertStrictEquals(it.next().value, 1);
      assertEquals([...it], [2, 3]);
    });
  });

  it("fuzzing", () => {
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
});
