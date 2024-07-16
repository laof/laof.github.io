var keys = 'ABK3456LMNOPQRSCDEFGHIJTUVWXYZ1278'
// var guest = 'A3KA35A3BA3CAK8A3RA3SABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3L'
var guest = 'AKZA3RA33AKZA3BA3CAK8A3RA3SABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3L'
var apar = 'AKZA3QA3CAK1AKZABQAKZA3OABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3L'
var home = 'A3EA3EA3EABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3LABQA3RA3B'

function run(a, b) {
  if (!a || !b) {
    return console.log('missing parameters')
  }

  var host = location.host
  if (host == zCode(guest)) {
    var err = document.querySelector('.nwaError')
    if (err && err.innerText) {
      return console.log(err.innerText)
    }
    return autosubmit(a, b)
  } else if (host == zCode(apar)) {
    console.log('login successful.')
  } else if (host == zCode(home)) {
    console.log('welcome!')
  } else {
    return console.log('domain error')
  }
}

function autosubmit(a, b) {
  var code = ''
  code = zCode('A3CA3RAK8A3Q')
  var ue = document.querySelector('input[name=' + code + ']')
  code = zCode('A3OAKZA3RA3RA3EA3NA3QAK7')
  var pe = document.querySelector('input[name=' + code + ']')
  var ae = document.querySelector('input[name=visitor_accept_terms]')
  var se = document.querySelector('input[type=submit]')

  if (!ue || !pe || !ae || !se) {
    return console.log('loggin in...')
  } else {
    console.log('Initialize the engine')
  }

  ue.value = a
  pe.value = b
  ae.checked = true
  se.disabled = false
  se.click()
}

/** === add === */
function jCode(value) {
  var kleng = keys.length
  var kstr = keys.split('')
  var v = '',
    cat,
    cat1,
    cat2,
    cat3
  for (var i = 0; i < value.length; i++) {
    cat = value.charCodeAt(i)
    cat1 = cat % kleng
    cat = (cat - cat1) / kleng
    cat2 = cat % kleng
    cat = (cat - cat2) / kleng
    cat3 = cat % kleng
    v += kstr[cat3] + kstr[cat2] + kstr[cat1]
  }
  return v
}

/** === unzip === */
function zCode(value) {
  var kleng = keys.length
  var alen,
    cat1,
    cat2,
    cat3,
    num = 0,
    arr
  arr = new Array(Math.floor(value.length / 3))
  alen = arr.length
  for (var i = 0; i < alen; i++) {
    cat1 = keys.indexOf(value.charAt(num))
    num++
    cat2 = keys.indexOf(value.charAt(num))
    num++
    cat3 = keys.indexOf(value.charAt(num))
    num++
    arr[i] = cat1 * kleng * kleng + cat2 * kleng + cat3
  }
  alen = eval('String.fromCharCode(' + arr.join(',') + ')')
  return alen
}

/** === end === */
