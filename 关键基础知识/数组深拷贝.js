// 并非对象深拷贝，是只针对数据内基本类型的拷贝
// 方法一：for循环
//方法二
function arrCopy(arr){
    var [...temp]=arr
    return [...temp]
}
function arrCopy(arr){
    return Array.from(arr)
}
function arrCopy(arr){
    return arr.slice()
}
function arrCopy(arr){
    return [].concat(arr)
}

function arrCopy(arr){
    return Object.assign(arr) 
}

var a=[1,2,3,[4],5]
var b={a:[1,2],b:{c:3},d:4}
var a1=arrCopy(a)
console.log(a1)
console.log(a1[3]==a[3])