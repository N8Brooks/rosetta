import { assertEquals, assertStrictEquals, describe, it } from "./test_deps.ts";
import { SelfOrganizingList } from "./self_organizing_list.ts";

function eq(num: number) {
  return (element: number) => element == num;
}

describe("insert", () => {
  it("insert without elements", () => {
    const list = new SelfOrganizingList();
    list.insert(1);
    assertEquals([...list], [1]);
  });

  it("insert with elements", () => {
    const list = new SelfOrganizingList([1, 2, 3]);
    list.insert(4);
    assertEquals([...list], [4, 1, 2, 3]);
  });
});

describe("find", () => {
  it("no elements", () => {
    const list = new SelfOrganizingList();
    const actual = list.find(() => true);
    assertStrictEquals(actual, undefined);
    assertEquals([...list], []);
  });

  it("first element", () => {
    const list = new SelfOrganizingList([1, 2, 3]);
    const actual = list.find(eq(1));
    assertStrictEquals(actual, 1);
    assertEquals([...list], [1, 2, 3]);
  });

  it("middle element", () => {
    const list = new SelfOrganizingList([1, 2, 3]);
    const actual = list.find(eq(2));
    assertStrictEquals(actual, 2);
    assertEquals([...list], [2, 1, 3]);
  });

  it("last element", () => {
    const list = new SelfOrganizingList([1, 2, 3]);
    const actual = list.find(eq(3));
    assertStrictEquals(actual, 3);
    assertEquals([...list], [3, 1, 2]);
  });

  it("no match", () => {
    const list = new SelfOrganizingList([1, 2, 3]);
    const actual = list.find(eq(4));
    assertStrictEquals(actual, undefined);
    assertEquals([...list], [1, 2, 3]);
  });

  it("no match and no elements", () => {
    const list = new SelfOrganizingList([]);
    const actual = list.find(eq(1));
    assertStrictEquals(actual, undefined);
    assertEquals([...list], []);
  });
});
