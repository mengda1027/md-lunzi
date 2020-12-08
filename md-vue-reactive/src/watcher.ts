import Dep, { pushTarget, popTarget } from "./dep"
import { watchCallback } from "./watch"

// ! 接收一个“渲染函数”作为参数，响应式数据的每个key可以包含多个watcher(存放在其dep中)
// ! Watcher的本质，其实就是存储了一个需要在特定时机触发的函数

// ! 因为watcher是一个在特定时间执行的渲染函数，所以计算属性也有自己的一个对应的watcher实例（此例中一共包含三个watcher）
// ! 渲染watcher只能作为依赖被收集到其他的dep筐子里，而computedWatcher实例上有属于自己的dep，它可以收集别的watcher作为自己的依赖

interface WatcherOptions {
  computed?: boolean
  watch?: boolean
  callback?: watchCallback
}

// 在Vue中每个组件都会有自己用来存放渲染函数的一个watcher
// watcher的运行路径就是： 开始 -> ParentWatcher -> SonWatcher -> ParentWatcher -> 结束
export default class Watcher {
  getter: Function // 渲染函数
  computed: boolean
  value: any
  watch?: boolean
  callback?: watchCallback
  dep?: Dep

  constructor(getter: Function, options: WatcherOptions = {}) {
    const { computed = false, watch = false, callback } = options

    this.getter = getter
    this.computed = computed
    this.watch = watch
    this.callback = callback
    this.value = undefined

    if (computed) {
      this.dep = new Dep() // 计算属性有自己的依赖；惰性求值，初始化的时候不会立刻运行getter
    } else {
      // watcher 初始化时会触发一次渲染函数
      this.get()
    }
  }

  // 触发渲染，收集依赖
  get() {
    // 先调用Dep类方法，把这个存储了渲染函数的watcher设置为当前的Dep.target
    pushTarget(this)
    debugger
    // 执行this.getter()也就是渲染函数，进而触发reactive中已准备好的数据劫持（get）,完成依赖收集
    // LINK ./reactive.ts:26
    // LINK ./dep.ts:17
    this.value = this.getter()
    popTarget()
    return this.value
  }

  // 仅为computed使用
  depend() {
    this.dep!.depend()
  }

  update() {
    if (this.computed) {
      this.get()
      this.dep!.notify()
    } else if (this.watch) {
      const oldValue = this.value
      this.get()
      if (this.callback) {
        this.callback(this.value, oldValue)
      }
    } else {
      this.get()
    }
  }
}
