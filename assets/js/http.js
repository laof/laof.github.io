fetch('./assets/data/user.json')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
