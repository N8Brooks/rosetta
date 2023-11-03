export interface LinkedList<T> {
  [Symbol.iterator](): IterableIterator<T>;

  push(data: T): void;

  pop(): T;
}
