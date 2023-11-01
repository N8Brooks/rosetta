package design_patterns

import (
	"math/rand"
	"reflect"
	"testing"
	"time"
)

func TestPush(t *testing.T) {
	var list LinkedList[int]
	expected := []int{1, 2, 3}
	for _, v := range expected {
		list.Push(v)
	}
	actual := list.ToSlice()
	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Expected %v, got %v", actual, expected)
	}
}

func TestPop(t *testing.T) {
	var list LinkedList[int]
	values := []int{1, 2, 3}

	for _, v := range values {
		list.Push(v)
	}

	for i := len(values) - 1; i >= 0; i-- {
		if val := list.Pop(); val != values[i] {
			t.Errorf("Expected %d, got %d", values[i], val)
		}
	}

	if list.first != nil || list.last != nil {
		t.Errorf("Expected empty list after popping all elements")
	}
}

func TestPopEmpty(t *testing.T) {
	var list LinkedList[int]
	defer func() {
		if r := recover(); r == nil {
			t.Errorf("The code did not panic")
		}
	}()

	_ = list.Pop()
}

func FuzzTestPushPop(f *testing.F) {
	seed := time.Now().UnixNano()
	rand.Seed(seed)
	f.Add(1)

	f.Fuzz(func(t *testing.T, val int) {
		expected := []int{}
		actual := LinkedList[int]{}

		for i := 0; i < 1000; i++ {
			if rand.Intn(2) == 0 {
				value := rand.Intn(1000)
				actual.Push(value)
				expected = append(expected, value)
			} else if len(expected) > 0 {
				actualValue := actual.Pop()
				expectedValue := expected[len(expected)-1]
				expected = expected[:len(expected)-1]
				if actualValue != expectedValue {
					t.Errorf("Expected %d, got %d", actualValue, expectedValue)
				}
			}
			if !reflect.DeepEqual(actual.ToSlice(), expected) {
				t.Errorf("Expected %v, got %v", expected, actual.ToSlice())
			}
		}
	})
}
