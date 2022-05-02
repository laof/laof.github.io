var reg = {
  ss: /ss:\/\/(.*?)(?=[\r\n,]|<\/)/g,
  ssr: /ssr:\/\/(.*?)(?=[\r\n,]|<\/)/g,
  vmess: /vmess:\/\/(.*?)(?=[\r\n,]|<\/)/g,
}

function getList(text, key) {
  var values = []
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
  var ssr = getList(document.body.innerHTML, 'ssr')
  var ss = getList(document.body.innerHTML, 'ss')
  var total = [].concat(ssr, ss)
  var txt = total.map(function (data) {
    return data.value
  })
  txt = txt.join('\n\n')
  if (total.length) {
    console.log(txt)
    var log = [
      'total:' + total.length,
      'ssr:' + ssr.length,
      'ss:' + ss.length,
    ]
    console.log(log.join(' ') + ', please to copy')
  } else {
    console.log('not found data, please upgrade job.')
  }
  return txt
}
