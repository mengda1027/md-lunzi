import Vue from "vue/dist/vue.esm"
import store from "./store"

new Vue({
  template: "<h1>{{ getState }}</h1>",
  store,
  computed: {
    getState() {
      return this.$store.state.text
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.text = "hello"
    }, 1000)
  },
}).$mount("#app")
