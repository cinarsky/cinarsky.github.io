function promisify(callbackFun){
  return function p(...args){
    return new Promise((res,rej)=>{
        callbackFun(...args,(err,data)=>{
            if(err){
                rej(err)
            }
            else{
                res(data)
            }
        })
    })
  }
}
var p=promisify(cb)
p(...args).then()



function callbackify(promise){
      return function (...args){
          var callback=args.pop()
              promise(...args).then(data=>{
                callback(null,data)
              }).catch(err=>{
                callback(err)
              })
      }
}


var cb=callbackify(p)
cb(...args,(err,data)=>{})
