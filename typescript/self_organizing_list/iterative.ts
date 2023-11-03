import { SelfOrganizingList, Test } from "./self_organizing_list.ts";

export class Iterative<T> implements SelfOrganizingList<T> {
  #list: T[];

  constructor(arr: T[]) {
    this.#list = [...arr];
  }

  static from<T>(arr: T[]): Iterative<T> {
    return new Iterative(arr);
  }

  insert(element: T) {
    this.#list.unshift(element);
  }

  find(test: Test<T>) {
    if (!this.#list.length) {
      return;
    }

    // Grab the first element, if it tests true, we are done
    let a = this.#list[0];
    if (test(a)) {
      return a;
    }

    // Iterate values, swapping each index circularly with the previous element
    for (let i = 1; i < this.#list.length; i++) {
      const b = this.#list[i];
      this.#list[i] = a;
      if (test(b)) {
        this.#list[0] = b;
        return b;
      }
      a = b;
    }

    // No elements found, re-shift elements
    this.#list.shift();
    this.#list.push(a);
  }

  inner(): T[] {
    return [...this.#list];
  }
}
