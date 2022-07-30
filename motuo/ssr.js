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

function run1() {
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

// https://github.com/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7

var noData = 'not found data, please upgrade job.'

function run() {

  var pre = document.querySelector('pre')

  if (!pre || !pre.innerHTML) {
    console.log(noData)
    return ''
  }

  var txt = pre.innerHTML

  var list = txt.split('\n')
  if (list.length) {
    console.log(list.join('\n\n'))
    console.log('total:' + list.length + ', please to copy')
  } else {
    console.log(noData)
  }
  return txt
}