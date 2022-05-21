package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"time"
)

type FileInfo struct {
	Name     string     `json:"name"`
	Size     string     `json:"size"`
	Length   int64      `json:"length"`
	Children []FileInfo `json:"children"`
}

type ResData struct {
	Files []FileInfo `json:"files"`
	Time  string     `json:"time"`
}

var fMap = map[string]bool{}
var exc = []string{
	"index.html",
	".gitignore",
	".git",
	".github",
	"go.mod",
	"go.sum",
	"main.go",
	"cmd",
	"output"}

func init() {
	for _, ele := range exc {
		fMap[ele] = true
		fMap["./"+ele] = true
	}
}

func Json() {
	save(".", "data.json")
	save("mogai", "mogai.json")

	fmt.Println("update json file successfully")
}

func save(dir, filename string) {
	var list []FileInfo
	file(dir, &list)

	var cstZone = time.FixedZone("CST", 8*3600)
	newtime := time.Now().In(cstZone).Format("2006-01-02 15:04:05")

	var rdata = ResData{Time: newtime, Files: list}

	data, _ := json.Marshal(rdata)

	var output = "output"
	os.Mkdir(output, 0755)
	ioutil.WriteFile(output+"/"+filename, data, 0644)

}

func file(dir string, list *[]FileInfo) {

	if fMap[dir] {
		return
	}

	fs, err := ioutil.ReadDir(dir)

	if err != nil {
		return
	}

	for _, e := range fs {

		name := e.Name()

		if dir == "." && fMap[name] {
			continue
		}

		len := e.Size()
		info := FileInfo{Name: name, Length: len, Size: size(len)}
		if e.IsDir() {
			info.Children = make([]FileInfo, 0)
			file(dir+"/"+name, &info.Children)
		}
		*list = append(*list, info)
	}
}

func size(bytes int64) string {

	num := float64(bytes)

	if bytes == 0 {
		return "0"
	}

	unit := "KB"
	num = num / 1024

	if num > 1024 {
		num = num / 1024
		unit = "MB"
	}
	if num > 1024 {
		num = num / 1024
		unit = "GB"
	}
	if num > 1024 {
		unit = "TB"
	}

	return fmt.Sprintf("%.2f%v", num, unit)

}
