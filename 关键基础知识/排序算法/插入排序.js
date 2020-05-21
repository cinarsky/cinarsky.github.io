var arr=[546,69,6,9,14,5,48,1,1564,651,654,86,4651,2,156,468,15,1.5,1.69,32.6,3,6]
function insertionSort(array){
  for (let i = 1; i < array.length; i++){
    for (let j = i; j >0; j--){
      if(array[j]<arr[j-1]){
        var temp=array[j-1]
        array[j-1]=arr[j]
        arr[j]=temp
      }else{
        break
      }
    }
  }
  return array
}

// function insertionSort(array){
//   for (let i = 1; i < array.length; i++){
//     var index=i
//     for (let j = i-1; j >=0; j--){
//       if(array[index]<arr[j]){
//         var temp=array[index]
//         array[index]=arr[j]
//         arr[j]=temp
//         index=j
//       }else{
//         break
//       }
//     }
//   }
//   return array
// }
console.log(insertionSort(arr))