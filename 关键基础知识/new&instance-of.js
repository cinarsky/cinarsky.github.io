function myNew(f,...args){
    // var mythis = Object.create(f.prototype)
    //等同于下几句
    var mythis={}
    mythis.__proto__=f.prototype
    var res=f.apply(mythis,args)
    if (res && typeof res=='object'){
        console.log(res==mythis)
       return res
    }
    else{
        console.log(res==mythis)
        return mythis
    }
}

function Person(name){
   this.name=name
   return this
}
console.log(myNew(Person,'hello'))


////////////////////////////////////////////////////////////
function myInstanceOf(a,b){
    if(a.__proto__==null){
        return false 
    }
    // if(a.constructor=b){
    if(a.__proto__==b.prototype){
        return true
    }else{
        return myInstanceOf(a.__proto__,b)
    }
}
console.log(myInstanceOf([],Function))