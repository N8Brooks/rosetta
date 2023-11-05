package linked_list

type LinkedList[T any] struct {
	first *linkedListNode[T]
	last  *linkedListNode[T]
}

func (list *LinkedList[T]) Push(data T) {
	node := &linkedListNode[T]{list.last, data, nil}
	if list.first == nil {
		list.first = node
		list.last = node
	} else {
		list.last.next = node
		list.last = node
	}
}

func (list *LinkedList[T]) Pop() T {
	if list.last == nil {
		panic("Pop from empty list")
	}
	data := list.last.data
	list.last = list.last.prev
	if list.last == nil {
		list.first = nil
	} else {
		list.last.next = nil
	}
	return data
}

func (list *LinkedList[T]) Iterator() LinkedListIterator[T] {
	return LinkedListIterator[T]{list.first}
}

func (list *LinkedList[T]) ToSlice() []T {
	slice := []T{}
	iterator := list.Iterator()
	for iterator.HasNext() {
		data := iterator.Next()
		slice = append(slice, data)
	}
	return slice
}

type linkedListNode[T any] struct {
	prev *linkedListNode[T]
	data T
	next *linkedListNode[T]
}

type LinkedListIterator[T any] struct {
	node *linkedListNode[T]
}

func (iterator *LinkedListIterator[T]) HasNext() bool {
	return iterator.node != nil
}

func (iterator *LinkedListIterator[T]) Next() T {
	data := iterator.node.data
	iterator.node = iterator.node.next
	return data
}
