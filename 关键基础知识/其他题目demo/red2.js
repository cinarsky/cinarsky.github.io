async function p() {
  var a = await setTimeout(() => {
    console.log('red1')

  })
  console.log('a',a)
  var b = await new Promise((res) => {
    setTimeout(() => {
      console.log('red2')
      res()
    }, 3000)
  }).then(() => {
    console.log(4)
  })
  console.log(b)
  }





p()