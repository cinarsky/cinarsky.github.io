// 返回数字位宽
var numWidth = function(num) {
    var temp=0;
    if(num==0){
        return 1;
    }
   while(Math.abs(num)>=1){
    num=(num-num%10)/10;
    temp++;
    
    }
    return temp;
}
console.log(numWidth(-14));


// 十进制转二进制(大数有问题?)
var convertToBase2 = function(num) {
    num1=Math.abs(num);
    var sum=0;
    var count=0;
    while(num1>=1){
        sum+=(num1%2)*10**count;
        num1=Math.floor(num1/2);
        count++;
    }
    if(num>=0){return sum}
    else{return -sum}
};


// 牛顿法求平方根
function sqrt(n) {
    // 初始值x,意为给定的一个不精准平方根
    var x = 2
    // 循环四次，精度参考循环次数
    x = x - (x * x - n) / (2 * x)
    x = x - (x * x - n) / (2 * x)
    x = x - (x * x - n) / (2 * x)
    x = x - (x * x - n) / (2 * x)
    return x
  }

// 二分法求平方根
  var sqrt =function(n){
    var min=0;
    var max=n;
    // debugger
    if(n==1){
        return 1
    }
    for(var i;;i++){
       i=Math.floor((max+min)*0.5);
       if(i*i<n){
           if((i+1)*(i+1)>n){
               return i
           }   
        min=i;
       }
       else if(i*i>n){
           max=i;
       }
       else{
           return i;
       }
    } 
}
  
  // 判断正整数是否为素数
var isPrime = function (n) {
    if (n == 2 || n == 3) {
        return true;
    } else if (n == 1||n%2==0) {
        return false;
    } else {
        // 当一个正整数不能被2和3整除，那么3以后可以每次累加2，因为3+1为偶数，已经被除数为2的时候排除了。
        for (var i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i == 0) {
                return false;
            }
        }
    }
    return true;
}
// 斐波那契函数
var fb=function(n){
    if(n<3){
        return 1 
    }
    return fb(n-1)+fb(n-2)
}
console.log(fb(4))


// 冒泡排序
function arrsort(arr){
    var temp=0;
    for(var i=0;i<arr.length-1;i++){
        for(var s=0;s<arr.length-i-1;s++){
            if(arr[s]>arr[s+1]){
                temp=arr[s];
                arr[s]=arr[s+1];
                arr[s+1]=temp;
            }
        }    
    }
        return arr
}
var hgj=[2,5,9,6,1,4]
arrsort(hgj);
console.log(hgj)


//  找出数组中的最大/最小数
function arrmax(arr){
    var max=-Infinity;
    for(var i=0;i<arr.length;i++){
         if(arr[i]>max){
             max=arr[i]
         }
    }
    return max;
}

function arrmin(arr){
    var min=Infinity;
    for(var i=0;i<arr.length;i++){
         if(arr[i]<min){
             min=arr[i]
         }
    }
    return min;
}
//快速排序
var arr=[5,7,2,9,3,8,4,7,1];
// 每次选择最左边的数作为基数
function quickSort(arr){
  if (arr.length<2) { return arr; }
  // 定义左指针
  var left=0;
  // 定义右指针
  var right=arr.length-1;
  //开启每一轮的排序
  while(left<right){
    // 寻找右边比arr[0]小的数的下标
    while(arr[right]>=arr[0] && left<right){
      right=right-1;
    }
    // 寻找左边比arr[0]大的数的下标
    while(arr[left]<=arr[0] && left<right){
      left++;
    }
    //当左边指针与右边指针相遇后，交换arr[0]与当前两个指针所在的元素
    if (right==left) {
      let mid=arr[right];
      arr[right]=arr[0];
      arr[0]=mid;
      break;
    }
    // 当左指针小于右指针的位置，交换两个指针当前位置的元素
    let tem=arr[right];
    arr[right]=arr[left];
    arr[left]=tem;
  }
  //递归实现
  return quickSort(arr.slice(0,left)).concat(arr.slice(left,right+1)).concat(quickSort(arr.slice(right+1)));
}
//对数组进行排序
console.log(quickSort(arr));

