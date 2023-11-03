import { SelfOrganizingList } from "./self_organizing_list.ts";
import {
  assertEquals,
  assertStrictEquals,
  describe,
  it,
} from "../test_deps.ts";

export type CreateSelfOrganizingList = <T>(arr: T[]) => SelfOrganizingList<T>;

export function testTemplate(
  createSelfOrganizingList: CreateSelfOrganizingList,
) {
  describe("insert", () => {
    it("insert without elements", () => {
      const list = createSelfOrganizingList<number>([]);
      list.insert(1);
      assertEquals(list.inner(), [1]);
    });

    it("insert with elements", () => {
      const list = createSelfOrganizingList([1, 2, 3]);
      list.insert(4);
      assertEquals(list.inner(), [4, 1, 2, 3]);
    });
  });

  describe("find", () => {
    it("no elements", () => {
      const list = createSelfOrganizingList([]);
      const actual = list.find(() => true);
      assertStrictEquals(actual, undefined);
      assertEquals(list.inner(), []);
    });

    it("first element", () => {
      const list = createSelfOrganizingList([1, 2, 3]);
      const actual = list.find(eq(1));
      assertStrictEquals(actual, 1);
      assertEquals(list.inner(), [1, 2, 3]);
    });

    it("middle element", () => {
      const list = createSelfOrganizingList([1, 2, 3]);
      const actual = list.find(eq(2));
      assertStrictEquals(actual, 2);
      assertEquals(list.inner(), [2, 1, 3]);
    });

    it("last element", () => {
      const list = createSelfOrganizingList([1, 2, 3]);
      const actual = list.find(eq(3));
      assertStrictEquals(actual, 3);
      assertEquals(list.inner(), [3, 1, 2]);
    });

    it("no match", () => {
      const list = createSelfOrganizingList([1, 2, 3]);
      const actual = list.find(eq(4));
      assertStrictEquals(actual, undefined);
      assertEquals(list.inner(), [1, 2, 3]);
    });

    it("no match and no elements", () => {
      const list = createSelfOrganizingList([]);
      const actual = list.find(eq(1));
      assertStrictEquals(actual, undefined);
      assertEquals(list.inner(), []);
    });
  });
}

function eq(num: number) {
  return (element: number) => element === num;
}
