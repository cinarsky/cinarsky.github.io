import acss from './a.css'
import c from './c.js'
const a={
    init(){
        console.log("a init bbbaaa")
    },
    cinit(){
       c.init()
    }
}
export default a;