var arr=[546,69,6,9,14,5,48,1,1564,651,654,86,4651,2,156,468,15,1.5,1.69,32.6,3,6]
// var arr=[0,1,2,3,4,5]
function BubbleSort(array){
  for (let i = 0; i < array.length-1; i++) {
    var max
    var count=0
    for (let j = 0; j < array.length-i-1; j++) {
      if(array[j]>array[j+1]){
        max=array[j]
        array[j]=array[j+1]
        array[j+1]=max
      }else{
        count++
      }
      if(count==array.length-i-1){
        return array
      }
    }
  }
  return array
}
console.log(BubbleSort(arr))