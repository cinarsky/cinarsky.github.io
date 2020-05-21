//Object.defineProperty的第一个缺陷,无法监听数组变化
// Object.defineProperty的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择。
// Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。

const person = {
  name: 'haorooms',
  age: 20
};
Object.keys(person).forEach(function(key) {
  Object.defineProperty(person, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`欢迎大家来到${newVal}`);
    },
  });
});
person.name = 'haorooms前端博客';

//课上讲的
function observe(obj) {
  for(let prop in obj) {
    let val = obj[prop]
    if (typeof val == 'object') {
      val = observe(val)
    }

    Object.defineProperty(obj, prop, {
      get: function() {
        console.log('getting property', prop)
        return val
      },
      set: function(value) {
        console.log('setting property', prop, 'to', value)
        if (typeof value == 'object') {
          value = observe(value)
        }
        val = value
      }
    })
  }
  return obj
}

