<template>
  <Fragment>
    <div
      ref="pointer"
      :class="[multiply && 'pointer--no-mix']"
      :style="style"
      class="pointer"
    />
    <div
      ref="offsetPointer"
      :class="[multiply && 'pointer__offset--multiply']"
      :style="offsetStyle"
      class="pointer__offset"
    />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

import { gsap } from 'gsap'
import { lerp } from '~/assets/utils/math'

export default {
  components: {
    Fragment,
  },
  props: {
    multiply: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      multiplier: 5,
      size: { width: 20, height: 20 },
      mouse: { x: -100, y: -100 },
      pos: { x: -100, y: -100 },
      selectedElement: false,
      isMouseDown: false,
    }
  },
  computed: {
    style() {
      const { width, height } = this.size

      return `width: ${width}px;
        height: ${height}px;
        border-radius: ${width}px;`
    },
    offsetStyle() {
      const {
        size: { width, height },
        multiplier,
      } = this

      return `width: ${width * multiplier}px;
        height: ${height * multiplier}px;
        border-radius: ${width * multiplier}px;`
    },
    xSet() {
      return gsap.quickSetter(this.$refs.offsetPointer, 'x', 'px')
    },
    ySet() {
      return gsap.quickSetter(this.$refs.offsetPointer, 'y', 'px')
    },
  },
  mounted() {
    // NORMAL pointer
    this.$bus.$on('tick', () => {
      const {
        xSet,
        ySet,
        mouse: { x, y },
        size: { width, height },
        multiplier,
      } = this

      const posX = lerp(this.pos.x, x - (width / 2) * multiplier, 0.2)
      const posY = lerp(this.pos.y, y - (height / 2) * multiplier, 0.2)

      gsap.set(this.$refs.pointer, {
        x: x - width / 2,
        y: y - height / 2,
      })

      this.pos = {
        x: posX,
        y: posY,
      }

      xSet(posX)
      ySet(posY)
    })

    this.$bus.$on('mousedown', () => {})

    this.$bus.$on('mouseup', () => {})

    this.$bus.$on('mousemove', ({ pageX, pageY, clientX, clientY }) => {
      this.mouse = { x: clientX, y: clientY }
    })
  },
}
</script>

<style lang="scss" scoped>
.pointer {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  pointer-events: none;

  &__offset {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
