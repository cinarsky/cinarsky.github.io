function A(n) {
  this.name=n
  if (new.target == A) {console.log(1)} 
  else {
    console.log(2)
    return new A(n)
  }
}
var a= A(54)
console.log(a)