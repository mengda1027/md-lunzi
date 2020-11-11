// new 操作符

function _new(fn) {
  // 通过 slice 把类数组对象转化为数组
  var args = [...arguments].slice(1)

  var obj = {}
  // 修改正实例的constructor. 使其根据原型链指向[Function: Person]
  obj.__proto__ = fn.prototype
  // 或者直接用 Object.create 实现
  // var obj = Object.create(fn.prototype);

  var ret = fn.apply(obj, args)

  // 如果有返回值且为对象类型，那么就返回结果，否则就返回 obj
  return Object.prototype.toString.call(ret) === "[object Object]" ? ret : obj
}

// 测试
function Person(name, age) {
  this.name = name
  this.age = age
}

var person = _new(Person, "tom", 18)
console.log(person)
console.log(person.constructor === Person)
console.log(person instanceof Person)
