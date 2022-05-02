const all = [
  fetch('page.json').then((res) => res.json()),
  fetch('data.json').then((res) => res.json()),
  fetch('blob/blob.json').then((res) => res.json()),
]

function addTitle(name, time = '', link) {
  let target = ''
  let href = ''
  if (link) {
    target = `target="_blank"`
    href = `href="${link}"`
  }

  if (time) {
    time = '&nbsp;&nbsp;' + time
  }

  const aaa = `<br><br><li>[<a ${href} ${target}>${name}</a>] ${time}</li><br>`

  return aaa
}

Promise.all(all).then(([page, data, blob]) => {
  const html = []
  let arr = []

  // page
  html.push(addTitle('repositories', '', 'https://github.com/laof?tab=repositories'))
  arr = liArr(page)
  html.push(...arr)

  // config
  const ori = location.origin
  arr = files('', data.files)
  html.push(
    addTitle('laof.github.io', data.time, 'https://github.com/laof/laof.github.io'),
  )
  arr = liArr(arr, location.origin)
  html.push(...arr)

  // blob
  arr = files('', blob.files)
  html.push(addTitle('blob', blob.time, 'https://github.com/laof/blob'))
  arr = liArr(arr, 'https://laof.github.io/blob/files')
  html.push(...arr)

  document.querySelector('#files').innerHTML = html.join('')
})

function liArr(list, domain = '') {
  return list.map((obj) => {
    return `<li><a href="${domain}${obj.link}" target="_blank">${obj.link}</a></li>`
  })
}

function files(path, data = [], arr = []) {
  for (let index = 0; index < data.length; index++) {
    const obj = data[index]
    const oc = obj.children
    if (!Array.isArray(oc)) {
      obj.link = `${path}/${obj.name}`
      arr.push(obj)
    } else if (oc.length) {
      files(`${path}/${obj.name}`, oc, arr)
    }
  }
  return arr
}
