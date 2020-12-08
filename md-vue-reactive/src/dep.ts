import Watcher from "./watcher"

// ! 用于解耦属性的依赖收集和派发更新操作， deps 存放依赖（watcher实例）

// ! 创建响应式数据（reactive.ts）或新建计算属性（computed.ts）时，都要创建dep实例

export default class Dep {
  static target: Watcher | null | undefined

  deps: Set<Watcher>

  constructor() {
    this.deps = new Set()
  }

  depend() {
    // Dep.target一定是一个Watcher的实例
    if (Dep.target) {
      this.deps.add(Dep.target)
    }
  }

  notify() {
    this.deps.forEach((watcher) => watcher.update())
  }
}

const targetStack: Watcher[] = []

// ! 先把当前正在运行的渲染函数的watcher作为依赖收集到computedWatcher内部的dep筐子里。
// ! 把自身computedWatcher设置为 全局Dep.target，然后开始求值
export function pushTarget(currentTarget: Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = currentTarget
}

// 取回上一个watcher作为Dep.target，并且栈里要弹出上一个watcher。
export function popTarget() {
  Dep.target = targetStack.pop()
}
