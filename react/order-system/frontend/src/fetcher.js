export default (f)=>{
    var cache={}
    // console.log(...args)
    return {
        read(...args){
        var key =args.join('|')
        if(key in cache){
            return cache[key]
        }else{
            throw f(...args).then(val=>{
                cache[key]=val
            })
        }
        }
    }
}