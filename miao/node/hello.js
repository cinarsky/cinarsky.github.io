var fs = require('fs')
var fsp = fs.promises


/**
 * 接收一个文件夹路径，返回这个文件夹里面的所有文件名
 * 需要递归的得到所有的文件名 并放在一个一维数组里返回
 * 需要写三个版本：
 * 同步版
 * 回调版
 * Promise版本
 */









// var res=[]

// function cb(file) {
//     res.push(file)
// }

// function listAllFilesSync(dirPath) {
//     var files=fs.readdirSync(dirPath) 
//         files.forEach(function (file) {
//             cb(dirPath + '\\' + file.toString())
        
//             if(fs.statSync(dirPath + '\\' + file).isDirectory()) {
//                 listAllFilesSync(dirPath + '\\' + file, cb)
//             }
//         })
    
   
// }
// listAllFilesSync('G:\\code\\damiaoTask\\node')
// console.log(res)












var res=[]
var c=0
function cb(file){
    res.push(file)
}
function listAllFilesCallback(dirPath, cb) {
    fs.readdir(dirPath,function(err, files){
        if (err) {
            return console.error(err);
        }
        var a=0
        files.forEach( function (file){
            a++
            cb(dirPath+'\\'+file.toString())

            // console.log(dirPath+'\\'+file.toString())
            if(fs.statSync(dirPath+'\\'+file).isDirectory()){
                listAllFilesCallback(dirPath+'\\'+file, cb)
            }
        });
     });
}

listAllFilesCallback('G:\\code\\damiaoTask\\node', cb) 
setTimeout(function(){console.log(res)},3000)









// var res=[]

// function cb(file) {
//     res.push(file)
// }



// function listAllFilesPromise(dirPath,cb) {
//     return new Promise((resolved,rejected)=>{
//         fs.readdir(dirPath,function(err, files){
//             if (err) {
//                 rejected(err)
//                 console.error(err);
//             }
//             var a=0
//             files.forEach( function (file){
//                 a++
//                 cb(dirPath+'\\'+file.toString())
//                 if(a==files.length){
//                     resolved()
//                 }
//                 if(fs.statSync(dirPath+'\\'+file).isDirectory()){
//                     listAllFilesPromise(dirPath+'\\'+file, cb)
//                 }
//             });
//          });
//     })
// }


// var files = listAllFiles('c:/')

// listAllFilesCallback('c:/', (err, files) => {

// })

// listAllFilesPromise('G:\\code\\damiaoTask\\node',cb).then(files => {
//      console.log(res)
// }, err => {
    
// })