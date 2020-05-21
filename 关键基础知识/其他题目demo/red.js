async function p(){
    while(true){
      await new Promise((res)=>{
        setTimeout(()=>{
          console.log('red1')
          res()
        },1000)
      })
      await new Promise((res)=>{
        setTimeout(()=>{
          console.log('red2')
          res()
        },3000)
      })
      await new Promise((res)=>{
        setTimeout(()=>{
          console.log('red3')
          res()
        },1000)
      })
    }
  }
  p()