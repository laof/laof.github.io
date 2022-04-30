function getList(text, key) {
  var values = []
  var reg = {
    ss: /ss:\/\/(.*?)(?=[\r\n,]|<\/)/g,
    ssr: /ssr:\/\/(.*?)(?=[\r\n,]|<\/)/g,
    vmess: /vmess:\/\/(.*?)(?=[\r\n,]|<\/)/g,
  }

  if (!reg[key]) {
    return values
  }

  var vs = text.match(reg[key]) || []

  if (vs.length) {
    vs.forEach(function (item, index) {
      values.push({
        name: key + index,
        value: item,
      })
    })
  }

  return values
}

function run() {
  var list = [].concat(
    getList(document.body.innerHTML, 'ssr'),
    getList(document.body.innerHTML, 'ss'),
  )

  return list
    .map(function (data) {
      return data.value
    })
    .join('\n')
}
