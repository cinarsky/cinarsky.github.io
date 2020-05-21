// 方法1版本一
function Copy(obj){
    if(typeof obj=='object'){
        var sub
        if(obj instanceof Array){
             sub=[]
        }
        else{
             sub={}
        }
        for (val in obj){
            sub[val]=Copy(obj[val])
        }
        return sub
    }
    else{
        return obj
    }
}



// 方法1版本二
// function Copy(obj){
//         var sub
//         if(obj.constructor==Object){
//              sub={}
//              for (val in obj){
//                 sub[val]=Copy(obj[val])
//             }
//             return sub
//         }
//         else if(obj.constructor==Array){
//              sub=[]
//              for (val in obj){
//                 sub[val]=Copy(obj[val])
//             }
//             return sub
//         }
//         else{
//             return obj
//         }
// }
// 方法2
function Copy(obj){
   return  JSON.parse(JSON.stringify(obj))
}

var a=[1,2,[3,4],5]
var b={a:[1,2],b:{c:3},d:4}
function pan(){}
var c=[1,pan]
var a1=Copy(a)
var b1=Copy(b)
var c1=Copy(c)
//
console.log(a1,b1,c1)
