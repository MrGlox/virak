import Vue from 'vue'
import { debounce } from 'lodash-es'

export default ({ app }) => {
  // eslint-disable-next-line no-new
  new Vue({
    created() {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener(
        'mouseup',
        debounce(() => {
          this.up()
        }, 20)
      )

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener(
        'mousedown',
        debounce((ev) => {
          this.down(ev)
        }, 20)
      )

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('mousemove', (ev) => this.move(ev))

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener(
        'mousestop',
        debounce(() => {
          this.moveStop()
        }, 100)
      )

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('touchmove', (ev) => this.touchMove(ev))
    },
    methods: {
      down(ev) {
        app.$bus.$emit('mousedown', ev)
      },
      up() {
        app.$bus.$emit('mouseup')
      },
      move(ev) {
        app.$bus.$emit('mousemove', ev)
      },
      moveStop() {
        app.$bus.$emit('mousemovestop')
      },
      touchMove(ev) {
        app.$bus.$emit('mousemove', ev)
      },
    },
  })
}
