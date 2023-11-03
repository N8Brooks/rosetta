export interface SelfOrganizingList<T> {
  /** Insert an element at the front of the list */
  insert(element: T): void;

  /** Find an element matching `test` from the list */
  find(test: Test<T>): T | undefined;

  /** Retrieve the inner list - used for testing */
  inner(): T[];
}

export type Test<T> = (element: T) => boolean;
