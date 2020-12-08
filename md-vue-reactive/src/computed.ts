import Watcher from "./watcher"

// ! Watcher的本质，其实就是存储了一个需要在特定时机触发的函数，在Vue内部，每个computed属性也有自己的一个对应的watcher实例
// ! 渲染watcher只能作为依赖被收集到其他的dep筐子里，而computedWatcher实例上有属于自己的dep，它可以收集别的watcher作为自己的依赖，所以当修改计算属性的依赖值时，更新的路径是
// ! data.number = 5 -> computedWatcher -> 渲染watcher -> 更新视图

type computedRef = {
  value?: any
}
export default function computed(getter: Function): computedRef {
  let def = {} // 存储computed的返回值，用.value来拿computed的真实值
  const computedWatcher = new Watcher(getter, { computed: true })
  Object.defineProperty(def, "value", {
    get() {
      computedWatcher.depend()
      return computedWatcher.get()
    },
  })
  return def
}
