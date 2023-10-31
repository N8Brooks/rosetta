import { describe, it, expect, beforeEach } from "@jest/globals";
import { LinkedList } from "../../src/iterator/linked_list"; // Import your LinkedList class here

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  describe("append", () => {
    it("should append items to the LinkedList", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe("pop", () => {
    it("should pop all items from the LinkedList", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.pop()).toBe(3);
      expect([...list]).toEqual([1, 2]);
      expect(list.pop()).toBe(2);
      expect([...list]).toEqual([1]);
      expect(list.pop()).toBe(1);
      expect([...list]).toEqual([]);
    });

    it("should maintain links between nodes", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.pop();
      expect([...list]).toEqual([1, 2]);
      list.append(4);
      expect([...list]).toEqual([1, 2, 4]);
    });

    it("should handle an empty list when popping", () => {
      expect(list.pop()).toBeUndefined();
    });
  });

  describe("iterator", () => {
    it("should create an empty LinkedList", () => {
      expect([...list]).toEqual([]);
    });

    it("should iterate correctly using the Symbol.iterator", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const it = list[Symbol.iterator]();
      expect(it.next().value).toBe(1);
      expect([...it]).toEqual([2, 3]);
    });
  });

  it("fuzzing", () => {
    const expected: number[] = [];
    for (let i = 0; i < 1000; i++) {
      if (Math.random() < 0.5) {
        const data = Math.floor(Math.random() * 1000);
        expected.push(data);
        list.append(data);
      } else {
        expect(list.pop()).toBe(expected.pop());
      }
      expect([...list]).toEqual(expected);
    }
  });
});
