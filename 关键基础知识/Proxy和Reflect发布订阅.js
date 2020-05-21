// 'use strict'
const myobservable = obj => new Proxy(obj, {set});

const queuedObservers = new Set();
const myobserve = fn => queuedObservers.add(fn);

function set(target, key, value, receiver) {
  //Reflect.set返回Boolean
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  // 严格模式下，Proxy Handler的set需要返回真，否则将报错
  //非严格模式下，可以不用下面这行
  return result;
}

// 实例
const person = myobservable({
  name: '张三',
  age: 20
});
function print() {
  console.log(`${person.name}, ${person.age}`)
}
function print1() {
  console.log('hello')
}
myobserve(print);
myobserve(print1);
person.name = '李四';
person.gh = '李四';
// 输出