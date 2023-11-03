interface LinkedListNode<T> {
  data: T;
  prev: LinkedListNode<T> | undefined;
  next: LinkedListNode<T> | undefined;
}

export class IterableIteratorLinkedList<T> {
  #first: LinkedListNode<T> | undefined;
  #last: LinkedListNode<T> | undefined;

  [Symbol.iterator](): IterableIterator<T> {
    return new LinkedListIterableIterator(this.#first);
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

class LinkedListIterableIterator<T> implements IterableIterator<T> {
  #node: LinkedListNode<T> | undefined;

  constructor(node: LinkedListNode<T> | undefined) {
    this.#node = node;
  }

  next(): IteratorResult<T> {
    if (this.#node) {
      const { data } = this.#node;
      this.#node = this.#node.next;
      return { value: data };
    } else {
      return { value: undefined, done: true };
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}
