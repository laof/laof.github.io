function run() {
  var a = document.querySelector('.home-downloadbutton')

  if (a) {
    console.log('node version:', a.getAttribute('data-version'))
  }
  return ""
}
