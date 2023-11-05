package util

import (
	"io/ioutil"
	"path/filepath"

	"github.com/BurntSushi/toml"
)

func ReadTestCases[T interface{}](filename string) T {
	var testCases T
	filePath := filepath.Join("..", "..", "testdata", filename, "test_cases.toml")
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		panic(err)
	}
	if _, err := toml.Decode(string(data), &testCases); err != nil {
		panic(err)
	}
	return testCases
}
