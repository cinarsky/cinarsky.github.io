var arr=[546,69,6,9,14,5,48,1,1564,651,654,86,4651,2,156,468,15,1.5,1.69,32.6,3,6]
function selectionSort(array){
  for (let i = 0; i < array.length-1; i++) {
    var minIndex=i
    // var min=arr[i]
    for (let j = i+1; j < array.length; j++) {
      if(arr[j]<arr[minIndex]){
        minIndex=j
      }
    }
    if(minIndex!=i){
      var temp=arr[i]
      arr[i]=arr[minIndex]
      arr[minIndex]=temp
    }
  }
  return array
}
console.log(selectionSort(arr))