export class Iterative<T> {
  #list: T[];

  constructor(iterable: Iterable<T> = []) {
    this.#list = [...iterable];
  }

  find(test: (element: T) => boolean) {
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

  insert(element: T) {
    this.#list.unshift(element);
  }

  *[Symbol.iterator]() {
    for (const element of this.#list) {
      yield element;
    }
  }
}
