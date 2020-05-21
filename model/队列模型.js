
//队列模型
function Queue(initVals = []) {
  this._head = null
  this._tail = null

  for (var val of ary) {
    this.add(val)
  }
}

Queue.prototype = {
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
  },
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
}
