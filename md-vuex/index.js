let Vue // vuex 基于 vue 的响应式机制，与 vuex 深度绑定
const install = (_Vue) => {
  // vue.use()执行的时候，会将vue作为参数传入进来，这里我们用一个变量接收 vue
  Vue = _Vue
  // Vue.mixin帮助我们全局混入$store
  Vue.mixin({
    beforeCreate() {
      // 这里的this指的是vue实例
      const options = this.$options
      if (options.store) {
        // 判断当前组件内部是否定义了store，如果有则优先使用内部的store
        this.$store = typeof options.store === "function" ? options.store() : options.store
      } else if (options.parent && options.parent.$store) {
        // 组件内部没有定义store,则从父组件下继承$store方法
        this.$store = options.parent.$store
      }
    },
  })
}
class Store {
  constructor(options = {}) {
    this.options = options
    // 通过 vue 实现 state 上的响应式
    this.vmData = new Vue({
      data: () => {
        return {
          state: options.state,
        }
      },
    })
    // 另一种响应式实现方式
    // this.vmData = {
    //   state: Vue.observable(options.state || {}),
    // }
    // 初始化 getter, function[]
    this.getters = {}
    // 实现 getter 访问逻辑
    Object.keys(options.getters).forEach((key) => {
      // 将对 this.getter 的访问代理到 options.getters 上, 简化书写方式 this.$store.getters.getText -> getStateByGetters
      // this.$store.getters.getText
      Object.defineProperty(this.getters, key, {
        get: () => {
          return options.getters[key](this.vmData.state)
        },
      })
    })
  }
  // 实现 state
  get state() {
    return this.vmData._data.state
  }
}
export default {
  install,
  Store,
}
