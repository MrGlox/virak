import Vue from 'vue'
import { debounce } from 'lodash-es'

export default ({ app }) => {
  // eslint-disable-next-line no-new
  new Vue({
    created() {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('scroll', this.scroll)

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('scroll', debounce(this.scrollEnd, 250))
    },
    methods: {
      scroll(ev) {
        app.$bus.$emit('scroll', ev)
      },
      scrollEnd(ev) {
        app.$bus.$emit('scrollEnd', ev)
      },
    },
  })
}
