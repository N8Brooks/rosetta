import { SelfOrganizingList } from "./self_organizing_list.ts";
import {
  assertEquals,
  assertStrictEquals,
  describe,
  it,
  readTestCases,
} from "../test_deps.ts";

export type CreateSelfOrganizingList = <T>(arr: T[]) => SelfOrganizingList<T>;

const { insert: INSERT_TEST_CASES, find: FIND_TEST_CASES } =
  (await readTestCases("self_organizing_list")) as TestCases;

type TestCases = { insert: InsertTestCases; find: FindTestCases };

type InsertTestCases = Record<string, InsertTestCase>;
type InsertTestCase = { input: number[]; insert: number; inner: number[] };

type FindTestCases = Record<string, FindTestCase>;
type FindTestCase = {
  input: number[];
  equals: number;
  inner: number[];
  expected?: number;
};

export function testTemplate(
  createSelfOrganizingList: CreateSelfOrganizingList,
) {
  describe("insert", () => insertTestTemplate(createSelfOrganizingList));
  describe("find", () => findTestTemplate(createSelfOrganizingList));
}

function insertTestTemplate(
  createSelfOrganizingList: CreateSelfOrganizingList,
) {
  for (
    const [name, { input, insert, inner }] of Object.entries(
      INSERT_TEST_CASES,
    )
  ) {
    it(name, () => {
      const list = createSelfOrganizingList<number>(input);
      list.insert(insert);
      assertEquals(list.inner(), inner);
    });
  }
}

function findTestTemplate(createSelfOrganizingList: CreateSelfOrganizingList) {
  for (
    const [name, { input, equals, inner, expected }] of Object.entries(
      FIND_TEST_CASES,
    )
  ) {
    it(name, () => {
      const list = createSelfOrganizingList<number>(input);
      const actual = list.find(eq(equals));
      assertStrictEquals(actual, expected);
      assertEquals(list.inner(), inner);
    });
  }
}

function eq(num: number) {
  return (element: number) => element === num;
}
