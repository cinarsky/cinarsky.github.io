function A() {
    let a = 1
    function B() {
        console.log(a)
    }
    return B
  }