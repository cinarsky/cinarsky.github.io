function myAsync(generator) {
  return new Promise((res, rej) => {
    //  初始化阶段
    var iterator = generator()
    var generated = iterator.next()
    function step() {
      if (generated.done) {
        Promise.resolve(generated.value).then(res)
        console.log('done')
      } else {
        Promise.resolve(generated.value).then(val => {
          console.log(val)
          generated = iterator.next(val)
          step()
        })
      }
    }

    step()
  })
}
// 完整版
// function myAsync(generator) {
//   return new Promise((res, rej) => {
//     //  初始化阶段
//     var iterator = generator()
//     var generated
//     try {
//       generated = iterator.next()
//     } catch (err) {
//       rej(err)
//     }

//     function step() {
//       if (generated.done) {
//         Promise.resolve(generated.value).then(res)
//         console.log('done')
//       } else {
//         Promise.resolve(generated.value).then(val => {
//           console.log(val)
//           try {
//             generated = iterator.next(val)
//           } catch (err) {
//             rej(err)
//           }
//           step()
//         }, reason => {
//           try {
//             generated = iterator.throw(reason)
//           } catch (err) {
//             rej(err)
//           }
//         })
//       }
//     }

//     step()
//   })
// }

// 实验
function* pan() {
  var a = yield console.log(5)
  var b = yield new Promise((res) => {
    setTimeout(() => {
      console.log(6);
      res(6)
    }, 1000)
  })
  var c = yield console.log(7);
  
}
myAsync(pan)
console.log(111)