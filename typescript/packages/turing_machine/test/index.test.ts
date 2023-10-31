import { describe, expect, it } from "@jest/globals";
import { Rule, TapeSymbol, turingMachine } from "../src";

describe("Increment unary number", () => {
  const incrementUnaryNumber: Rule[] = [
    {
      currentState: "q0",
      tapeSymbol: 1,
      printOperation: 1,
      tapeMotion: 1,
      finalState: "q0",
    },
    {
      currentState: "q0",
      tapeSymbol: undefined,
      printOperation: 1,
      tapeMotion: 1,
      finalState: "qf",
    },
  ];

  it("0 -> 1", () => {
    const tape0: TapeSymbol[] = [];
    const actual = turingMachine("q0", incrementUnaryNumber, tape0);
    expect(actual).toEqual([1]);
  });

  it("3 -> 4", () => {
    const tape0 = [1, 1, 1];
    const actual = turingMachine("q0", incrementUnaryNumber, tape0);
    expect(actual).toEqual([1, 1, 1, 1]);
  });
});

describe("Turing's very first example", () => {
  const zeroOneSequency: Rule[] = [
    {
      currentState: "b",
      tapeSymbol: undefined,
      printOperation: 0,
      tapeMotion: 1,
      finalState: "c",
    },
    {
      currentState: "c",
      tapeSymbol: undefined,
      printOperation: undefined,
      tapeMotion: 1,
      finalState: "d",
    },
    {
      currentState: "d",
      tapeSymbol: undefined,
      printOperation: 1,
      tapeMotion: 1,
      finalState: "e",
    },
    {
      currentState: "e",
      tapeSymbol: undefined,
      printOperation: undefined,
      tapeMotion: 1,
      finalState: "b",
    },
  ];

  it("4 sequence", () => {
    const actual = turingMachine("b", zeroOneSequency, [], 4);
    expect(actual).toEqual([0, undefined, 1, undefined]);
  });

  it("6 sequence", () => {
    const actual = turingMachine("b", zeroOneSequency, [], 6);
    expect(actual).toEqual([0, undefined, 1, undefined, 0, undefined]);
  });
});
