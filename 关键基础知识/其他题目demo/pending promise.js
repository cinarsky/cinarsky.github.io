let promise
async function f() {
  promise = new Promise((res) => {
    setTimeout(() => res('done'), 1000)
  })
  let result = await promise
  console.log(result)
}
f()
console.log(promise)
console.log(1)


// let result
// async function f() {
//    result = await new Promise((res) => {
//     setTimeout(() => res('done'), 1000)
//   })
//   console.log(result)
// }
f()

// console.log(result)