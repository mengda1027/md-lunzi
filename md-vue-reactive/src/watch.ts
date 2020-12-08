import Watcher from "./watcher"

export interface watchCallback {
  (newValue: any, oldValue: any): any
}

export default function watch(getter: Function, callback: watchCallback) {
  // ! getter需要读取到响应式的属性，确保依赖能被收集到
  new Watcher(getter, { watch: true, callback })
}
