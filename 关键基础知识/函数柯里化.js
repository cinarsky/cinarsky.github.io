
// 函数柯里化
function curry(f){
  return function curried(...args){
    if(args.length==f.length){
      return f.apply(null,args)
    }
    else{
      return function(...args2){
        return curried.apply(this, args.concat(args2));
      }
    }
  }

}
var a=curry(pan)
console.log(a(1)(2)(3)(4))



// function pan(...args){
//   let element=0
//    for (let i = 0; i < args.length; i++) {
//       element += args[i];
//    }
//    return element
// }
function pan(a,b,c,d){
  return a+b+c+d
}
console.log(pan.length)
