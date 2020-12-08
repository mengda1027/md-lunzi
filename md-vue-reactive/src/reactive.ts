import Dep from "./dep"
import { isObject } from "./utils"

// ! 目标：在data添加setter/getter 完成依赖收集/触发渲染的目的

// 将每个组件的data定义为响应式
export default function reactive<T extends object>(data: T): T {
  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      // 对每个key进行响应式处理
      defineReactive(data, key as keyof T)
    })
  }
  return data
}

function defineReactive<T extends object, K extends keyof T>(data: T, key: K): void {
  let val = data[key]
  // Dep 用于收集依赖，触发渲染；每个key有自己的dep
  const dep = new Dep()

  // 组件的 data 对象上添加每个key 对应的 set/get
  Object.defineProperty(data, key, {
    get() {
      dep.depend() // 依赖收集(将当前watcher存放在组件的dep中)
      return val
    },
    set(newVal) {
      // debugger
      // 在 dev 面板修改 data.number=2 , 观察dep的数据结构（包含三个watcher,其中两个为渲染watcher, 一个为computedWatcher）
      val = newVal
      dep.notify() // 触发渲染
    },
  })

  // 如果值是 object 递归调用
  if (isObject(val)) {
    reactive(val)
  }
}
