# Linked List

Create a doubly linked list data structure with the following operations:

- push() - takes a generic element and adds it to the end of the linked list.
- pop() - Removes and returns the last element and errors if the list is empty.
- iter() - Creates an iterator across elements of the list.

## Test Cases

Each test case is a key of the toml file.
It's value contains an array of the following kinds of values:

- {pop: number} - Pop should be called and the value should equal the value.
- {push: number} - Push should be called with the given number.
- {iter: number[]} - Iterating across the list should provide these values.
