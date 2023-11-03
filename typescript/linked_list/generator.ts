import { LinkedList } from "./linked_list.ts";

interface LinkedListNode<T> {
  data: T;
  prev: LinkedListNode<T> | undefined;
  next: LinkedListNode<T> | undefined;
}

export class GeneratorList<T> implements LinkedList<T> {
  #first: LinkedListNode<T> | undefined;
  #last: LinkedListNode<T> | undefined;

  *[Symbol.iterator](): IterableIterator<T> {
    let node = this.#first;
    while (node !== undefined) {
      yield node.data;
      node = node.next;
    }
  }

  push(data: T) {
    const node = { data, prev: this.#last, next: undefined };
    if (this.#last) {
      this.#last.next = this.#last = node;
    } else {
      this.#first = this.#last = node;
    }
  }

  pop() {
    if (!this.#last) {
      throw Error("Pop from empty list");
    }
    const { data } = this.#last;
    this.#last = this.#last.prev;
    if (this.#last) {
      this.#last.next = undefined;
    } else {
      this.#first = undefined;
    }
    return data;
  }
}
