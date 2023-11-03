/** A 5-tuple instruction for processing */
export type Rule = {
  /** Matching m configuration or Turing State */
  matchState: string;

  /** The matching tape symbol for the rule where `"blank"` is blank */
  matchSymbol: string;

  /** The print operation, where `"none"` doesn't change the current cell and `"erase"` erases the symbol */
  print: string;

  /** Move to the left with `-1`, stay (or noop) with `0`, and right with `1`. */
  motion: number;

  /** The resulting m-configuration or turing state where `"finish"` ends */
  state: string;
};

export class TuringMachine {
  #rules: readonly Rule[];
  #state0: string;

  constructor(state0: string, rules: Rule[]) {
    this.#rules = [...rules];
    this.#state0 = state0;
  }

  perform(_tape0: string[], maxOperations = Infinity) {
    let state = this.#state0;

    const tape = new Tape(_tape0);
    const tape0 = new Tape(_tape0);

    for (let i = 0; i < maxOperations && state !== "finish"; i++) {
      const rule = this.#findRule(state, tape.head);

      if (rule.print !== "none") {
        tape.head = rule.print === "erase" ? tape0.head : rule.print;
      }

      state = rule.state;

      tape0.move(rule.motion);
      tape.move(rule.motion);
    }

    return tape.toArray();
  }

  #findRule(state: string, symbol: string) {
    return this.#rules.find(
      ({ matchState: currentState, matchSymbol: tapeSymbol }) =>
        state === currentState && symbol == tapeSymbol
    )!;
  }
}

class Tape {
  /** left side of the tape */
  #leftSide: string[] = [];
  /** Current symbol */
  head: string;
  /** Reversed right side of the tape */
  #rightSide: string[];

  constructor(rightSide: string[]) {
    [this.head = "blank", ...this.#rightSide] = rightSide;
  }

  move(direction: number) {
    switch (Math.sign(direction)) {
      case -1:
        this.#rightSide.push(this.head);
        this.head = this.#leftSide.pop() ?? "blank";
        break;
      case 0:
        break;
      case 1:
        this.#leftSide.push(this.head);
        this.head = this.#rightSide.pop() ?? "blank";
        break;
    }
  }

  toArray() {
    return [...this.#leftSide, this.head, ...this.#rightSide.toReversed()];
  }
}
