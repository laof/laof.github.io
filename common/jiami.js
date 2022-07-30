var keys = 'ABK3456LMNOPQRSCDEFGHIJTUVWXYZ1278'

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
