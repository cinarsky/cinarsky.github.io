class Queue {
   static from(ary) {
     var q = new Queue()
     for(var val of ary) {
       q.add(val)
     }
     return q
   }
 
   constructor(initVals) {
     this._head = null
     this._tail = null
   
     for (var val of initVals) {
       this.add(val)
     }
   }
 
   add(val) {
     var node = {
       val: val,
       next: null,
     }
     if (this._head == null) {
       this._head = this._tail = node
     } else {
       this._tail.next = node
       this._tail = node
     }
     return this
   }
 
   remove() {
     if (!this._head) {
       return undefined
     }
     var node = this._head
     this._head = this._head.next
     if (this._head == null) {
       this._tail = null
     }
     return node.val
   }
 
   get size() {
     return this._size
   }
 }
 