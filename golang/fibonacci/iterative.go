package fibonacci

import "math/big"

func Iterative(n uint32) *big.Int {
	a := big.NewInt(0)
	b := big.NewInt(1)
	for i := uint32(0); i < n; i++ {
		a.Add(a, b)
		a, b = b, a
	}
	return b
}
