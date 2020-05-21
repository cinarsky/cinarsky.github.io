var cinarsky = {
  chunk: function (arr, n) {
    var res = []
    if (arr.length % n == 0) {
      var l = arr.length / n
      for (var i = 0; i < arr.length; i = i + l) {
        res.push(arr.slice(i, i + l))
      }
    } else {
      res.push(arr.slice(0, arr.length - 1))
      res.push(arr.slice(arr.length - 1))
    }
    return res
  },
  chunk2: (array, n) => {
    var res = []
    for (let i = 0; i < array.length; i++) {
      if (res[res.length - 1] instanceof Array && res[res.length - 1].length < n) {
        res[res.length - 1].push(array[i])
      } else {
        res.push([array[i]])
      }

    }
    return res
  },
  compact: function (ary) {
    return ary.filter(it => it)
  },
  // 此时vals本身是二维数组，（...vals）是传入的多个一维数组，val是二维数组中的各个一维数组
  difference: function (arr, ...vals) {
    var tem = []
    for (val of vals) {
      tem = tem.concat(val)
    }
    return arr.filter(item => !tem.includes(item))
  },

  differenceBy: function (arr, ...vals) {
    var a = vals[vals.length - 1]
    if (typeof (a) == "function") {
      var iteratee = vals.pop()
    } else if (typeof (a) == "string") {
      var iteratee = function (item) {
        return item[a]
      }
      vals.pop()
    } else {
      var iteratee = function (val) {
        return val
      }
    }
    var tem = []
    for (val of vals) {
      tem = tem.concat(val)
    }

    tem = tem.map(item => iteratee(item))

    return arr.filter(function (item) {
      return !tem.includes(iteratee(item))
    })
  },

  drop: function (arr, n = 1) {
    return arr.slice(n)
  },

  dropRight: function (arr, n = 1) {

    return n < arr.length ? arr.slice(0, arr.length - n) : []
  },

  dropRightWhile: function (arr, predicate) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    var res = []
    for (var i = arr.length - 1; i >= 0; i--) {
      if (!predicate(arr[i])) {
        var s = i
        break
      }
    }
    for (var i = 0; i <= s; i++) {
      res.push(arr[i])
    }

    return res
  },

  dropWhile: function (arr, predicate) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    var res = []
    for (var i = 0; i < arr.length; i++) {
      if (!predicate(arr[i])) {
        var s = i
        break
      }
    }
    for (var i = s; i < arr.length; i++) {
      res.push(arr[i])
    }

    return res
  },

  fill: function (arr, val, start = 0, end = arr.length) {
    if (end > arr.length) {
      end = arr.length
    }
    if (start < 0) {
      start = 0
    }
    for (var i = start; i < end; i++) {
      arr[i] = val
    }
    return arr
  },

  findLastIndex: function (arr, predicate, fromIndex = arr.length - 1) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    for (var i = fromIndex; i >= 0; i--) {
      if (predicate(arr[i])) {
        return i
      }
    }
    return -1
  },

  findIndex: function (arr, predicate, fromIndex = 0) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    for (var i = fromIndex; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return i
      }
    }
    return -1
  },



  flatten: function (arr) {
    return [].concat(...arr)
  },

  flattenDeep: function (arr) {
    return arr.toString().split(',').map(a => Number(a))
  },

  flattenDepth: function (arr, depth = 1) {
    debugger
    while (depth > 0) {
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        res = res.concat(arr[i])
      }
      arr = res
      depth--
    }
    return arr
  },

  initial: function (arr) {
    return arr.slice(0, arr.length - 1)
  },

  indexOf: function (arr, val, fromIndex = 0) {
    while (fromIndex < 0) {
      fromIndex += arr.length
    }
    for (var i = fromIndex; i < arr.length; i++) {
      if (arr[i] == val) {
        return i
      }
      if (arr[i] != arr[i] && val != val) {
        return i
      }
    }
    return -1
  },

  intersection: function (arr1, ...arrs) {
    var tem = []
    for (val of arrs) {
      tem = tem.concat(val)
    }
    var res = []
    for (val of arr1) {
      if (tem.includes(val)) {
        res.push(val)
      }
    }
    return res
  },

  head: function (arr) {
    return arr[0]
  },

  fromPairs: function (arr) {
    var map = {}
    for (key of arr) {
      map[key[0]] = key[1]
    }
    return map
  },


  join: function (arr, separator = ',') {
    var str = '';
    for (var i = 0; i < arr.length - 1; i++) {
      str += arr[i];
      str += separator;
    }
    str += arr[arr.length - 1]
    return str
  },

  last: function (arr) {
    return arr[arr.length - 1]
  },

  lastIndexOf: function (arr, val, fromIndex = arr.length - 1) {

    for (var i = fromIndex; i >= 0; i--) {
      if (arr[i] == val) {
        return i
      }
      if (arr[i] != arr[i] && val != val) {
        return i
      }
    }
    return -1
  },

  pull: function (arr, ...val) {
    for (var i = 0; i < arr.length; i++) {
      /*不能用if(arr[i] in val), key in array的key代表下标*/
      if (val.indexOf(arr[i]) >= 0) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  },

  reverse: function (arr) {
    var l = arr.length - 1
    for (var i = 0; i < (l) / 2; i++) {
      var temp = arr[i];
      arr[i] = arr[l - i]
      arr[l - i] = temp
    }
    return arr
  },
  /////////
  sortedIndex: function (arr, val) {
    var l = 0;
    var r = arr.length - 1;
    while (r != l && r != l + 1) {
      var mid = Math.floor((l + r) / 2)
      if (arr[mid] > val) {
        r = mid
      }
      if (arr[mid] < val) {
        l = mid
      }
      if (arr[mid] == val) {
        r = mid
      }
    }
    return l + 1
  },

  union: function (...arr) {
    var tem = []
    for (val of arr) {
      tem = tem.concat(val)
    }
    var res = []
    for (val of tem) {
      if (!res.includes(val)) {
        res.push(val)
      }
    }
    return res
  },

  // unionBy: function(...arr, iteratee){
  //   if (!iteratee) {
  //     iteratee = it => it;
  //   } else if (typeof (iteratee) == 'string') {
  //     var a = iteratee
  //     iteratee = it => it[a]
  //   }

  //   var tem=[]
  //   for(val of arr){
  //      tem=tem.concat(val)
  //   }
  //   var res=[]
  //   for(val of tem){
  //     if(!res.includes(iteratee(val))){
  //       res.push(val)
  //     }
  //   }
  //   return res
  // },

  uniq: function (arr) {
    var res = []
    for (val of arr) {
      if (!res.includes(val)) {
        res.push(val)
      }
    }
    return res
  },

  uniqBy: function (arr, iteratee) {
    if (!iteratee) {
      iteratee = it => it;
    } else if (typeof (iteratee) == 'string') {
      var a = iteratee
      iteratee = it => it[a]
    }
    var res = []
    var arr1 = []
    for (val of arr) {
      if (!arr1.includes(iteratee(val))) {
        arr1.push(iteratee(val))
        res.push(val)
      }
    }
    return res
  },

  unzip: function (arr) {
    return arr[0].map(function (item0, index0) {
      return arr.map(function (item, index) {
        return item[index0]
      })
    })
  },

  without: function (arr, ...values) {
    var res = []
    for (val of arr) {
      if (!values.includes(val)) {
        res.push(val)
      }
    }
    return res
  },

  xor: function (...arrs) {
    var map = {}
    var tem = []
    var res = []
    for (val of arrs) {
      tem = tem.concat(val)
    }
    for (val of tem) {
      if (val in map) {
        map[val]++
      } else {
        map[val] = 1
      }
    }
    for (val in map) {
      if (map[val] == 1) {
        res.push(Number(val))
      }
    }
    return res
  },
  //////////////
  zip: function (...arr) {
    return arr[0].map(function (item0, index0) {
      return arr.map(function (item, index) {
        return item[index0]
      })
    })
  },

  countBy: function (col, iteratee) {
    if (!iteratee) {
      iteratee = it => it;
    } else if (typeof (iteratee) == 'string') {
      var a = iteratee
      iteratee = it => it[a]
    }
    var map = {}
    for (val of col) {
      if (iteratee(val) in map) {
        map[iteratee(val)]++
      } else {
        map[iteratee(val)] = 1
      }
    }
    return map
  },

  every: function (col, predicate) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    for (val of col) {
      if (!predicate(val)) {
        return false
      }
    }
    return true
  },

  filter: function (arr, predicate) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    return arr.filter(item => predicate(item))
  },

  find: function (arr, predicate, fromIndex = 0) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }

    for (var i = fromIndex; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return arr[i]
      }
    }
    return null
  },

  flatMap: function (arr, iteratee) {
    arr = arr.map(item => iteratee(item))
    return [].concat(...arr)
  },

  flatMapDepth: function (arr, iteratee, depth = 1) {
    arr = arr.map(item => iteratee(item))
    return cinarsky.flattenDepth(arr, depth)
  },
  flat1: (arr) => {
    var res = []
    for (i in arr) {
      res = res.concat(arr[i])
    }
    return res
  },
  flatN: (arr) => {
    var res = []
    function p(array) {
      for (i in array) {
        if (array[i] instanceof Array) {
          p(array[i])
        } else {
          res.push(array[i])
        }
      }
    }
    p(arr)
    return res
  },
  flatn: (arr,n) => {
    var res = []
    function p(array,count=0) {
      for (i in array) {
        if (array[i] instanceof Array) {
          if(count<n){
            p(array[i],count+1)
          }else{
            res.push(array[i])
          }
        } else {
          res.push(array[i])
        }
      }
    }
    p(arr)
    return res
  },
  forEach: function (col, iteratee) {
    for (val in col) {
      iteratee(col[val], val)
    }
    return col
  },

  groupBy: function (col, iteratee) {
    var a = iteratee
    if (!a) {
      iteratee = it => it;
    } else if (typeof (a) == 'string') {
      iteratee = it => it[a];
    } else if (a instanceof Array) {
      iteratee = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    }
    var map = {}
    for (val of col) {
      var b = iteratee(val)
      if (b in map) {
        map[b].push(val)
      } else {
        map[b] = [];
        map[b].push(val)
      }
    }
    return map
  },

  keyBy: function (col, iteratee) {

    var a = iteratee
    if (!a) {
      iteratee = it => it;
    } else if (typeof (a) == 'string') {
      iteratee = it => it[a];
    } else if (a instanceof Array) {
      iteratee = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      iteratee = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }

    var map = {}
    for (val of col) {
      var b = iteratee(val)
      map[b] = val
    }
    return map
  },

  map(col, iteratee) {
    var a = iteratee
    if (!a) {
      iteratee = it => it;
    } else if (typeof (a) == 'string') {
      iteratee = it => it[a];
    } else if (a instanceof Array) {
      iteratee = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      iteratee = function (item) {
        for (val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    var res = []
    for (val in col) {
      res.push(iteratee(col[val]))
    }
    return res

  },
//////////
  isArguments: function (value) {
    return Object.prototype.toString.call(value) === '[object Arguments]'
  },

  isArray: function (value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  },

  isBoolean: function (value) {
    return Object.prototype.toString.call(value) == "[object Boolean]"
  },


  isDate: function (val) {
    return Object.prototype.toString.call(val) === "[object Date]";
  },

  isError: function (val) {
    return Object.prototype.toString.call(val) === "[object Error]";
  },

  isFunction: function (val) {
    return Object.prototype.toString.call(val) == "[object Function]"
  },

  // undefined和null
  isNaN: function (val) {
    return val != val
  },

  isNull: function (val) {
    return Object.prototype.toString.call(val) === "[object Null]"
  },

  isNumber: function (val) {
    return Object.prototype.toString.call(val) === "[object Number]"
  },

  isObject: function (val) {
    return val instanceof Object
  },

  isString: function (value) {
    return Object.prototype.toString.call(value) === "[object String]"
  },
  isRegExp: function (val) {
    return Object.prototype.toString.call(val) === "[object RegExp]";
  },
  isUndefined: function (value) {
    return Object.prototype.toString.call(value) == '[object Undefined]'
  },

  isElement: function (val) {
    return Object.prototype.toString.call(val) === "[object Element]";
  },

  isEmpty: function (val) {
    if (!val) {
      return true
    }
    var keys = Object.keys(val)
    return keys.length == 0;
  },

  isEqual: function (value, other) {
    if (typeof (value) == typeof (value)) {
      if (typeof (value) == 'boolean' | typeof (value) == 'number' | typeof (value) == 'string') {
        return value == other;
      } else if (typeof (value) == 'function') {
        return value === other;
      } else if (typeof (value) == 'object') {
        var l = Object.keys(value).length
        var r = Object.keys(other).length
        if (l == r) {
          for (val in value) {
            if (!cinarsky.isEqual(value[val], other[val])) {
              return false
            }
          }
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  },

  isMatch: function (object, source) {

  },

  toArray: function (value) {
    var res = []
    for (val in value) {
      res.push(value[val])
    }
    return res
  },

  ceil: function (number, precision = 0) {
    number = number * (10 ** precision)
    number = Math.floor(number) + 1
    number = number / (10 ** precision)
    return number
  },
  max: function (arr) {
    if (arr.length == 0) {
      return undefined
    }
    var m = -Infinity
    for (val of arr) {
      if (val > m) {
        m = val
      }
    }
    return m
  },
  min: function (arr) {
    if (arr.length == 0) {
      return undefined
    }
    var m = Infinity
    for (val of arr) {
      if (val < m) {
        m = val
      }
    }
    return m
  },
  maxBy: function (arr, iteratee) {
    iteratee = cinarsky.typetrans(iteratee)
    var m = -Infinity
    for (var val of arr) {
      if (iteratee(val) > m) {
        n = val
        m = iteratee(n)
      }
    }
    return n
  },

  round: function (number, precision = 0) {
    number = number * (10 ** precision)
    number = (number).toFixed(0)
    number = number / (10 ** precision)
    return number
  },




  sumBy: function (arr, iteratee) {
    iteratee = cinarsky.typetrans(iteratee)
    var res = 0
    for (val of arr) {
      res += iteratee(val)
    }
    return res
  },

  random([lower = 0], [upper = 1], [floating]) {

  },
  // 自有属性
  assign: function (...sources) {
    var map = {}
    for (vals of sources) {
      for (val in vals) {
        if (vals.hasOwnProperty(val)) {
          map[val] = vals[val]
        }
      }
    }
    return map
  },

  assignIn: function (...sources) {
    var map = {}
    for (vals of sources) {
      for (val in vals) {
        map[val] = vals[val]
      }
    }
    return map
  },

  merge: function (obj, sources) {

  },


  defaults: function (...object) {
    var map = {}
    for (vals of object) {
      for (val in vals) {
        if (val in map) {

        } else {
          map[val] = vals[val]
        }
      }
    }
    return map
  },
  // 封装的函数
  typetrans: function (predicate) {
    var a = predicate
    if (!a) {
      predicate = it => it;
    } else if (typeof (a) == 'string') {
      predicate = it => it[a];
    } else if (a instanceof Array) {
      predicate = function (item) {
        if (item[a[0]] != a[1]) {
          return false
        }
        return true
      }
    } else if (typeof (a) == 'object') {
      predicate = function (item) {
        for (var val in a) {
          if (item[val] != a[val]) {
            return false
          }
        }
        return true
      }
    }
    return predicate
  },

  findKey: function (arr, predicate) {
    predicate = this.typetrans(predicate)
    for (var val in arr) {
      if (predicate(arr[val])) {
        return val
      }
    }
    return null
  },

  forIn: function (object, iteratee) {
    for (var val in object) {
      iteratee(object[val], val)
    }
    return object
  },

  // 改变对象属性属性
  forInRight: function (object, iteratee) {
    var res = [];
    for (var key in object) {
      res.push(key);
    }
    for (var i = res.length - 1; i >= 0; i--) {
      iteratee(object[res[i]], res[i]);
    }
    return object;
  },
  //  obj.hasOwnProperty(keys)判断的是非原型继承的私有属性，Object.keys()列举的是所有的可枚举属性
  forOwn: function (obj, iteratee) {
    for (let name in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, name)) {
        iteratee(obj[name], name, obj)
      }
    }
    return obj
  },

  forInRight: function (obj, iteratee) {
    var res = []
    for (let name in obj) {
      res.unshift(name)
    }

    for (let name of res) {
      if (Object.prototype.hasOwnProperty.call(obj, name)) {
        iteratee(obj[name], name)
      }
    }
    return obj
  },

  functions: function (obj) {
    var res = []
    for (let name in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, name)) {
        res.push(name)
      }
    }
    return res
  },
  toPath: function (value) {
    return value.split(/\]\[|\]\.?|\.?\[|\./g)
  },
  get: function (object, path, defaultValue) {
    var obj = JSON.parse(JSON.stringify(object));
    if (typeof (path) == 'string') {
      path = path.split(/\]\[|\]\.?|\.?\[|\./g)
    }

    for (val of path) {
      if (!obj) {
        return defaultValue
      }
      obj = obj[val]
    }
    if (obj) {
      return obj
    }
    return defaultValue
  },

  has: function (object, path) {
    var obj = JSON.parse(JSON.stringify(object));
    if (typeof (path) == 'string') {
      path = path.split(/\]\[|\]\.?|\.?\[|\./g)
    }
    for (val of path) {
      if (!obj) {
        return false
      }
      obj = obj[val]
    }
    if (!obj) {
      return false
    }
    return true
  },
  invert: function (object) {
    var obj = {}
    for (var val in object) {
      obj[object[val]] = val
    }
    return obj
  },
  // arg的处理很重要
  invoke: function (object, path, ...arg) {
    var obj = JSON.parse(JSON.stringify(object));
    if (typeof (path) == 'string') {
      path = path.split(/\]\[|\]\.?|\.?\[|\./g)
    }
    var func = path.pop()
    for (val of path) {
      obj = obj[val]
    }
    return obj[func](...arg)
  },

  keys: function (obj) {
    var res = []
    for (var val in obj) {
      if (obj.hasOwnProperty(val)) {
        res.push(val)
      }
    }
    return res
  },



  mapValues: function (obj, iteratee) {
    var res = {}
    iteratee = this.typetrans(iteratee)
    for (val in obj) {
      res[val] = iteratee(obj[val], obj)
    }
    return res

  },

  omit: function (obj, paths) {
    var res = {}
    for (val in obj) {
      if (!paths.includes(val)) {
        res[val] = obj[val]
      }
    }
    return res
  },
  pick: function (obj, paths) {
    var res = {}
    for (val in obj) {
      if (paths.includes(val)) {
        res[val] = obj[val]
      }
    }
    return res
  },



  constant: function (value) {
    return function () {
      return value
    }
  },
  times: function (n, iteratee) {
    var res = []
    iteratee = cinarsky.typetrans(iteratee)
    for (var i = 0; i < n; i++) {
      res.push(iteratee(i))
    }
    return res
  },

  toPairs: function (obj) {
    var res = []
    for (val in obj) {
      if (obj.hasOwnProperty(val)) {
        res.push([val, obj[val]])
      }
    }
    return res
  },

  values: function (obj) {
    var res = []
    for (val in obj) {
      if (obj.hasOwnProperty(val)) {
        res.push(obj[val])
      }
    }
    return res
  },


  // propertyOf: function(obj){
  //   for(var val in ){
  //j
  //   }
  // },
  //
  set: function (object, path, value) {
    var obj1 = JSON.parse(JSON.stringify(object));
    if (typeof (path) == 'string') {
      path = path.split(/\]\[|\]\.?|\.?\[|\./g)
    }
    var obj = obj1
    var path1 = path.pop()
    for (val of path) {
      obj = obj[val]
    }
    obj[path1] = value
    return obj1
  },

  result: function (object, path, defaultValue) {
    // 对对象的深拷贝
    var obj = JSON.parse(JSON.stringify(object));
    if (typeof (path) == 'string') {
      path = path.split(/\]\[|\]\.?|\.?\[|\./g)
    }
    console.log(path)
    for (val of path) {
      if (!obj) {
        return defaultValue
      }
      obj = obj[val]
    }
    if (obj) {
      return obj
    }
    return defaultValue
  },

  mapKeys: function (obj, iteratee) {
    var res = {}
    iteratee = cinarsky.typetrans(iteratee)
    for (val in obj) {
      res[iteratee(obj[val], val, obj)] = obj[val]
    }
    return res
  },

  escape: function (str) {
    var map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }
    var res = ''
    for (var i = 0; i < str.length; i++) {
      if (str[i] in map) {
        res += map[str[i]]
      } else {
        res += str[i]
      }
    }
    return res
  },

  pad: function (str = '', length = 0, chars = ' ') {
    var l = str.length
    var left = Math.floor((length - l) / 2)
    var right = length - l - left
    var lstr = ''
    var i = 0
    while (left > 0) {
      i = i % (chars.length)
      lstr += chars[i++]
      left--
    }
    var i = 0;
    var rstr = ''
    while (right > 0) {
      i = i % (chars.length)
      rstr += chars[i++]
      right--
    }
    return lstr + str + rstr
  },

  padEnd: function (str = '', length = 0, chars = ' ') {
    var l = str.length
    var right = length - l
    var i = 0;
    var rstr = ''
    while (right > 0) {
      i = i % (chars.length)
      rstr += chars[i++]
      right--
    }
    return str + rstr
  },


  padStart: function (str = '', length = 0, chars = ' ') {
    var l = str.length
    var left = length - l
    var lstr = ''
    var i = 0
    while (left > 0) {
      i = i % (chars.length)
      lstr += chars[i++]
      left--
    }

    return lstr + str
  },

  repeat: function (str = "", n = 1) {
    var ans = "";
    for (let i = 0; i < n; i++) {
      ans += str;
    }
    return ans;
  },

  //dom方法写的
  unescape: function (str) {
    var node = document.createElement("div")
    node.innerHTML = str
    var text = node.innerText

    return text
  },
  //常规方法写的
  unescape: function (str) {
    return str.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&apos;", "'");
  },

  range: function (start = 0, end = start, step = 1) {
    // debugger
    if (arguments.length == 1) {
      start = 0
      end = arguments[0]
    }
    if (start >= 0 && end < 0) {
      step = -1
    }
    var res = []
    for (var i = 0; ; i++) {
      var a = start + step * i
      res.push(a)
      if (a == end || i == end - start) {
        res.pop()
        return res
      }
    }

  }

}
module.exports = cinarsky
// console.log(cinarsky.range(-4))