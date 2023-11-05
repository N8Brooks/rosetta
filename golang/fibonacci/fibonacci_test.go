package fibonacci

import (
	"fmt"
	"golang/util"
	"math/big"
	"testing"
)

type TestCases struct {
	TestCases []TestCase `toml:"test-cases"`
}

type TestCase struct {
	Input  uint32 `toml:"input"`
	Output string `toml:"output"`
}

func TestIterative(t *testing.T) {
	testTemplate(Iterative, t)
}

func TestFastDoubling(t *testing.T) {
	testTemplate(FastDoubling, t)
}

func testTemplate(fibonacci func(n uint32) *big.Int, t *testing.T) {
	testCases := util.ReadTestCases[TestCases]("fibonacci")
	for _, tc := range testCases.TestCases {
		t.Run(fmt.Sprintf("Fibonacci(%d)", tc.Input), func(t *testing.T) {
			expected := new(big.Int)
			expected.SetString(tc.Output, 10)
			actual := fibonacci(tc.Input)
			if actual.Cmp(expected) != 0 {
				t.Errorf("Fibonacci(%d) = %s; want %s", tc.Input, actual.String(), expected.String())
			}
		})
	}
}
