<template>
  <transition appear @enter="enter" @before-enter="beforeEnter" @leave="leave">
    <div ref="container" :style="rotation" class="overlay overlay--container">
      <div
        ref="inner"
        :style="translation"
        class="overlay__move overlay__move--scroll-locked"
      >
        <div class="overlay__content">
          <p>I'm Virak</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data() {
    return {
      angle: 8,
    }
  },
  computed: {
    rotation() {
      let style = `
        width: ${
          120 * Math.abs(Math.cos((this.angle * Math.PI) / 180)) +
          120 * Math.abs(Math.sin((this.angle * Math.PI) / 180))
        }%;
      `

      style += `
        height: ${
          110 * Math.abs(Math.sin((this.angle * Math.PI) / 180)) +
          110 * Math.abs(Math.cos((this.angle * Math.PI) / 180))
        }%;
      `

      style += `
        transform: translateX(-50%) translateY(-50%) rotate3d(0,0,1,${this.angle}deg);
      `

      return style
    },
    translation() {
      return `
        transform: rotate3d(0,0,1,-${this.angle}deg);
      `
    },
  },
  methods: {
    enter() {
      // Pointer events related class
      this.$refs.container.classList.add('overlay--hidden')

      // "Unreveal effect" (inner moves to one direction and reverse moves to the opposite one)
      gsap.to(this.$refs.container, {
        duration: 1.8,
        ease: 'expo.inOut',
        y: '-110%',
      })

      gsap.to(this.$refs.inner, {
        duration: 1.8,
        ease: 'expo.inOut',
        y: '140%',
      })
    },
    beforeEnter() {},
    completeEnter() {
      // if (this.$refs.inner) this.$refs.inner.style.display = 'none'
    },
    leave() {},
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  $el: &;

  &--container {
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    width: 100vw;
    min-height: 100vh;
    background-color: $primary;
  }

  &--hidden {
    overflow: hidden;
  }

  &__move {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
  }

  &__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 40px;
    color: $lightcolor;
  }
}
</style>
