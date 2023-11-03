export interface SelfOrganizingList<T> {
  /** Insert an element at the front of the list */
  insert(element: T): void;

  /** Find an element matching `test` from the list */
  find(test: (element: T) => boolean): T | undefined;

  /** Retrieve the inner list - used for testing */
  inner(): T[];
}
