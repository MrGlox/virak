import Vue from 'vue'
import { debounce } from 'lodash-es'

export default ({ app }) => {
  // eslint-disable-next-line no-new
  new Vue({
    created() {
      this.update()

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener(
        'resize',
        debounce(() => {
          this.update()
        }, 250)
      )
    },
    methods: {
      update() {
        app.$bus.$emit('resize')
      },
    },
  })
}
