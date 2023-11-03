import { SelfOrganizingList } from "./self_organizing_list.ts";

export class MoveToFront<T> implements SelfOrganizingList<T> {
  #list: T[];

  constructor(arr: T[]) {
    this.#list = [...arr];
  }

  static from<T>(arr: T[]): MoveToFront<T> {
    return new MoveToFront(arr);
  }

  insert(element: T) {
    this.#list.unshift(element);
  }

  find(test: (element: T) => boolean) {
    for (let i = 0; i < this.#list.length; i++) {
      const element = this.#list[i];
      if (test(element)) {
        this.#list.splice(i, 1);
        this.#list.unshift(element);
        return element;
      }
    }
  }

  inner(): T[] {
    return [...this.#list];
  }
}
