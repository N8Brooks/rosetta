package fibonacci

import "math/big"

func FastDoubling(n uint32) *big.Int {
	if n <= 1 {
		return big.NewInt(1)
	}
	m := n / 2
	a := FastDoubling(m - 1)
	b := FastDoubling(m)
	if n&1 == 0 {
		a.Mul(a, a)
		b.Mul(b, b)
		a.Add(a, b)
	} else {
		a.Add(a, a)
		a.Add(a, b)
		a.Mul(a, b)
	}
	return a
}
