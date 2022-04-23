var version = '333,333'

function run(username, password) {
  console.log(version)

  if (!username || !password) {
    console.log('please input username and password fk')
    return
  }
  console.log(username, password)
}
