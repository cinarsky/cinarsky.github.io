// var fs =require('fs')
// var stream=fs.ReadStream('C:/Users/cinarsky/Desktop/3.rmvb')
// var ws=fs.WriteStream('C:/Users/cinarsky/Desktop/新建文本文档1.txt')
// stream.pipe(ws)

var data=''
stream.on('data',function(chunk){
    ws.write(chunk.toString())
    console.log('reading')
})
stream.on('close',function(){
    console.log('readed')
    ws.end()
})
