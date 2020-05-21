var arr = [1, 1, 10, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 888, 888, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]

////////es5///////
//原始方法，暴力
function Count(array) {
  for (let i = 0; i < array.length-1; i++) {
    const element = array[i];
    for (let j = i+1; j < array.length; j++) {
      if (array[j]== element) {
        array.splice(j,1)
        j--
      }
    }
  }
  return array
}


//创建新数组，利用indexOf判断是否存在
function indexOfCount(array) {
  var res = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (res.indexOf(element) == -1) {
      res.push(element)
    }
  }
  return res
}

//创建新数组，利用includes判断是否存在
function includesCount(array) {
  var res = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (!res.includes(element)) {
      res.push(element)
    }
  }
  return res
}

//利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。
function sortCount(array) {

  var res = array.sort((a, b) => a - b)
  for (let i = 0; i < res.length - 1; i++) {
    if (res[i] == res[i + 1]) {
      res.splice(i + 1, 1)
      i--
    }
  }
  return res
}



////////es6////////
// 利用对象直接量{}
function pureMapCount(arr) {
  var map = {}
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] in map) {
      arr.splice(i, 1)
      i--
    } else {
      map[arr[i]] = arr[i]
    }
  }
  return arr
}

// 利用Map数据类型
function mapCount(arr) {
  var map = new Map()
  for (var i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      arr.splice(i, 1)
      i--
    } else {
      map.set(arr[i], arr[i])
    }
  }
  return arr
}

// 利用Set数据类型
function setCount(arr) {
  var set = new Set()
  for (var i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      arr.splice(i, 1)
      i--
    } else {
      set.add(arr[i])
    }
  }
  return arr
}

//简单利用Set
function setCount2(arr) {
  return Array.from(new Set(arr))
}



console.log(Count(arr))