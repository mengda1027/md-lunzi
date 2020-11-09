import Vue from "vue/dist/vue.esm"
import Vuex from "./index"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: "Hello Vuex",
  },
  getters: {
    getText(state) {
      return state.text.replace("State", "Getters")
    },
  },
  mutations: {},
  actions: {},
  modules: {},
})
