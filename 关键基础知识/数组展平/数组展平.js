function flat1(arr){
  var res = []
  for (i in arr) {
    res = res.concat(arr[i])
  }
  return res
}


function flatN(arr){
  var res = []
  function p(array) {
    for (i in array) {
      if (array[i] instanceof Array) {
        p(array[i])
      } else {
        res.push(array[i])
      }
    }
  }
  p(arr)
  return res
}


function flatn(arr,n){
  var res = []
  function p(array,count=0) {
    for (i in array) {
      if (array[i] instanceof Array) {
        if(count<n){
          p(array[i],count+1)
        }else{
          res.push(array[i])
        }
      } else {
        res.push(array[i])
      }
    }
  }
  p(arr)
  return res
}