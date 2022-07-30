package cmd

import (
	"fmt"
	"io/ioutil"

	"github.com/bep/golibsass/libsass"
	"github.com/evanw/esbuild/pkg/api"
)

func Style() string {
	transpiler, _ := libsass.New(libsass.Options{OutputStyle: libsass.CompressedStyle})

	style, _ := ioutil.ReadFile("static/style.scss")

	result, _ := transpiler.Execute(string(style))
	return string(result.CSS)

}

func Script() string {
	js, _ := ioutil.ReadFile("static/main.ts")
	result := api.Transform(string(js), api.TransformOptions{
		Loader:            api.LoaderTS,
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
	})

	fmt.Printf("%d errors and %d warnings\n",
		len(result.Errors), len(result.Warnings))

	return string(result.Code)
}
