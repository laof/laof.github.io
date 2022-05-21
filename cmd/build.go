package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"os"
)

func main() {
	tpl, _ := ioutil.ReadFile("static/tpl.htm")
	check := func(err error) {
		if err != nil {
			log.Fatal(err)
		}
	}
	t, err := template.New("webpage").Parse(string(tpl))
	check(err)

	data := struct {
		Style string
		Items []string
	}{
		Style: fmt.Sprintf("<style>%v</style>", Style()),
		Items: []string{
			"My photos",
			"My blog",
		},
	}

	ff, _ := os.OpenFile("index.html", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, os.ModePerm)
	t.Execute(ff, data)
}
