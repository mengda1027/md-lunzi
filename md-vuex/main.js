import Vue from "vue/dist/vue.esm"
import store from "./store"

new Vue({
  template: `<div>
              <h1>state:{{ getState }}</h1>
              <h1>getter:{{ getStateByGetters }}</h1>
            </div>`,
  store,
  computed: {
    getState() {
      return this.$store.state.text
    },
    getStateByGetters() {
      return this.$store.getters.getText
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.text = this.$store.state.text.replace("Vuex", "State")
    }, 1000)
  },
}).$mount("#app")
