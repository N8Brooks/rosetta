export class SelfOrganizingList<T> {
  #list: T[];

  constructor(iterable: Iterable<T> = []) {
    this.#list = [...iterable];
  }

  // deno-lint-ignore no-explicit-any
  find(test: (element: T) => any) {
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

  // deno-lint-ignore no-explicit-any
  _find2(test: (element: T) => any) {
    this.#list.forEach((element, i) => {
      if (test(element)) {
        this.#list.splice(i, 1);
        this.#list.unshift(element);
        return element;
      }
    });
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
