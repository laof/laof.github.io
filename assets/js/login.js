(function (username, password) {
  if (!username || !password) {
    console.log('please input username and password fk')
    return
  }

  console.log(username, password)
})(window.username, window.password)
