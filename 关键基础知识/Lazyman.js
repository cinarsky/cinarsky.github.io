function LazyMan(name) {
  return new _LazyMan(name)
}
class _LazyMan {
  constructor(name) {
    this.name = () => {
      console.log(name)
      
    }
    this.tasks = [this.name]
    this.time = null
    this.run.call(this)
    //ES6的class只能通过new来使用，不能直接运行。
    // if(new.target!=LayMan){
    //   return this
    // }
  }
  run() {
    if (this.time) {
      clearTimeout(this.time)
      this.time = null
    }
    this.time = setTimeout(async () => {
      for (var task of this.tasks) {
        await task()
      }
    })
  }

  eat(event) {
    var task = () => {
      console.log(event)
    }
    this.tasks.push(task)
    return this
  }
  sleep(num) {
    var task = () => {
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          res()
          console.log('Wake up after '+num)
        },num*1000)
      })
    }
    this.tasks.push(task)
    return this
  }
  sleepFirst(num) {
    var task = () => {
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          res()
          console.log('Wake up after '+num)
        },num*1000)
      })
    }
    this.tasks.unshift(task)
    return this
  }



}
// LazyMan('Hank').eat('dinner').eat('supper')
// LazyMan('Hank').sleep(5).eat('dinner')
LazyMan('Hank').sleepFirst(5).eat('supper')