function create(obj){
    function F(){
        F.prototype=obj
    }
    return new F()
}
console.log(create({a:123}))