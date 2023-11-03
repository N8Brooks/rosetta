export class MoveToFront<T> {
  #list: T[];

  constructor(iterable: Iterable<T> = []) {
    this.#list = [...iterable];
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

  insert(element: T) {
    this.#list.unshift(element);
  }

  *[Symbol.iterator]() {
    for (const element of this.#list) {
      yield element;
    }
  }
}
