Function.prototype.myBind = function (thisArg) {
  // 设置 fn 为调用 myCall 的方法
  const fn = this

  // 获取该方法剩余参数
  const otherArg = [...arguments].slice(1)

  // 设置返回的一个新方法
  const result = function () {
    // 获取返回方法体的参数
    const resultArg = [...arguments] // 新传入的参数

    // 如果是通过 new 调用的，绑定 this 为实例对象; 此时为 {}
    if (this instanceof result) {
      fn.apply(this, otherArg.concat(resultArg))
    } else {
      // 否则普通函数形式绑定 context
      fn.apply(thisArg, otherArg.concat(resultArg))
    }
  }

  // 绑定原型链
  result.prototype = Object.create(fn.prototype)

  // 返回结果
  return result
}

// 测试用例 (在浏览器环境运行)
this.a = 1

const fn = function () {
  console.log(this.a)
}
const ctxOb = {
  a: 2,
}

const bindFn = fn.myBind(ctxOb)
fn() // 1
bindFn() // 2

const b = new bindFn()
console.log(b instanceof bindFn) // true
console.log(b instanceof fn) // true
