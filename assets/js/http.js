(function(){
  fetch('./assets/data/test.json')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
})()
