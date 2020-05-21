Function.prototype.myBind = function (thisArg, ...fixedArgs) {
    var self = this
    return function newFnc(...args) {
        // 考虑将bind之后的函数作为构造函数使用
        // if(new.target==newFnc){
        // return new self(...fixedArgs,...args)
        // }
        // else{
        return  self.call(thisArg, ...fixedArgs, ...args)
        // }
    }

}