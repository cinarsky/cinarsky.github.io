var arr=[546,69,6,9,14,5,48,1,1564,651,654,86,4651,2,156,468,15,1.5,1.69,32.6,3,6]
function sort(array){
  var map={}
  for (let i = 1; i < array.length; i++){
    map[array[i]]=array[i]
  }
  var arr=[]
  for(val in map){
     arr.push(Number(val))
  }
  return arr
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
console.log(sort(arr))