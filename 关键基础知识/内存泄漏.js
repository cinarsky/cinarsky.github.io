var a = {
    b: 1,
    c: setTimeout(()=>console.log(111), 1000)
  }
  a=null
  console.log(a)