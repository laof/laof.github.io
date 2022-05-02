const data = [
  fetch('page.json').then((res) => res.json()),
  fetch('data.json').then((res) => res.json()),
  fetch('blob/blob.json').then((res) => res.json()),
]

function addTitle(name, time = '', link = 'javascript:;') {
  return `
  <li></li>
  <li>>----------<a href="${link}" target="_blank">${name}</a>${time}------------</li>
  `
}

Promise.all(data).then(([page, data, blob]) => {
  const html = []
  let arr = []

  // page
  html.push(addTitle('project'))
  arr = page.map((obj) => {
    return `<li><a href="${obj.link}" target="_blank">${obj.name}</a></li>`
  })
  html.push(...arr)

  // config
  const ori = location.origin
  arr = files('', data.files)
  html.push(addTitle('config'), data.time)
  arr = arr.map((obj) => {
    return `<li><a href="${ori}${obj.link}" target="_blank">${obj.name}</a></li>`
  })
  html.push(...arr)

  // blob
  arr = files('', blob.files)
  const blink = "https://github.com/laof/blob/files"
  html.push(addTitle('blob'), blob.time, 'https://github.com/laof/blob')
  arr = arr.map((obj) => {
    return `<li><a href="${blink}${obj.link}" target="_blank">${obj.name}</a></li>`
  })
  html.push(...arr)

  document.querySelector('#files').innerHTML = html.join('')
})

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
