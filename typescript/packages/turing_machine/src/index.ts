/** M configuration or Turing State where `"q0"` is start and `"qf"` is finish */
export type State = "q0" | "qf" | any;

/** Symbol scanned where `undefined` is blank */
export type TapeSymbol = undefined | any;

/** An instruction for processing */
export type Rule = {
  /** The matching state for the rule */
  currentState: State;
  /** The matching tape symbol for the rule */
  tapeSymbol: TapeSymbol;
  /** The print operation, where not printing is done by printing the current symbol and "erase" erases the symbol */
  printOperation: "erase" | TapeSymbol;
  /** Move to the left with `-1`, stay (or noop) with `0`, and right with `1`. */
  tapeMotion: number;
  /** The resulting state */
  finalState: State;
};

export function turingMachine(
  state: State,
  rules: readonly Rule[],
  tape: TapeSymbol[],
  maxOperations = Infinity
): TapeSymbol[] {
  /** The initial tape, stored for erase operations */
  const tape0 = [...tape] as const;
  /** A model where the head moves and the tape is stationary */
  let head = 0;

  for (let i = 0; i < maxOperations && state !== "qf"; i++) {
    const symbol = tape[head];

    const { printOperation, tapeMotion, finalState } = rules.find(
      ({ currentState, tapeSymbol }) =>
        state === currentState && tapeSymbol === symbol
    )!;

    tape[head] = printOperation === "erase" ? tape0[head] : printOperation;

    state = finalState;

    head += tapeMotion;
  }

  return tape;
}
