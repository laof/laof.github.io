package cmd

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"os"
)

func Page() {
	tpl, _ := ioutil.ReadFile("static/tpl.htm")
	check := func(err error) {
		if err != nil {
			log.Fatal(err)
		}
	}
	t, err := template.New("foo").Parse(string(tpl))
	check(err)

	data := struct {
		CSS    template.HTML
		SCRIPT template.HTML
	}{
		CSS:    template.HTML(fmt.Sprintf("<style>%v</style>", Style())),
		SCRIPT: template.HTML(fmt.Sprintf("<script>%v</script>", Script())),
	}

	index, _ := os.OpenFile("output/index.html", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, os.ModePerm)
	t.Execute(index, data)
}
