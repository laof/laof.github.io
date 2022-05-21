package main

import (
	"io/ioutil"

	"github.com/bep/golibsass/libsass"
)

func Style() string {
	transpiler, _ := libsass.New(libsass.Options{OutputStyle: libsass.CompressedStyle})

	style, _ := ioutil.ReadFile("static/style.scss")

	result, _ := transpiler.Execute(string(style))

	return result.CSS
}
