import { describe, expect, it } from "@jest/globals";
import { TuringMachine } from "../src";

describe("Turing's very first example", () => {
  const zeroOneSequence = new TuringMachine("b", [
    {
      matchState: "b",
      matchSymbol: "blank",
      print: "0",
      motion: 1,
      state: "c",
    },
    {
      matchState: "c",
      matchSymbol: "blank",
      print: "blank",
      motion: 1,
      state: "d",
    },
    {
      matchState: "d",
      matchSymbol: "blank",
      print: "1",
      motion: 1,
      state: "e",
    },
    {
      matchState: "e",
      matchSymbol: "blank",
      print: "none",
      motion: 1,
      state: "b",
    },
  ]);

  it("4 sequence", () => {
    const input: string[] = [];
    const actual = zeroOneSequence.perform(input, 4);
    const expected = ["0", "blank", "1", "blank", "blank"];
    expect(actual).toEqual(expected);
  });

  it("6 sequence", () => {
    const input: string[] = [];
    const actual = zeroOneSequence.perform(input, 6);
    const expected = ["0", "blank", "1", "blank", "0", "blank", "blank"];
    expect(actual).toEqual(expected);
  });
});

describe("Increment unary number", () => {
  const INCREMENT_UNARY_NUMBER = new TuringMachine("q0", [
    {
      matchState: "q0",
      matchSymbol: "1",
      print: "none",
      motion: 1,
      state: "q0",
    },
    {
      matchState: "q0",
      matchSymbol: "blank",
      print: "1",
      motion: 0,
      state: "finish",
    },
  ]);

  it("0 -> 1", () => {
    const actual = INCREMENT_UNARY_NUMBER.perform([]);
    expect(actual).toEqual(["1"]);
  });

  it("3 -> 4", () => {
    const input = ["1", "1", "1"];
    const actual = INCREMENT_UNARY_NUMBER.perform(input);
    const expected = ["1", "1", "1", "1"];
    expect(actual).toEqual(expected);
  });
});
