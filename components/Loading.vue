<template>
  <div class="interaction">
    <transition
      appear
      @enter="enter"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div class="content content--first">
        <div class="content__move content__move--scroll-locked">
          <div class="content__reverse animations">
            <div class="animations__title-container">
              <p ref="animationTitle" class="animations__title">I'm Virak</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <Pointer :multiply="multiply" />
  </div>
</template>

<script>
import anime from 'animejs'
import BezierEasing from 'bezier-easing'

import Revealer from '~/assets/utils/revealer'
import splitText from '~/assets/utils/split-text'
import textAnimation from '~/assets/utils/text-animation'

export default {
  data() {
    return {
      multiply: false,
    }
  },
  methods: {
    beforeEnter(el) {
      this.timeline = anime.timeline()
      this.revealer = new Revealer(el, { angle: 12 })
      this.customEasing = BezierEasing(0.83, -0.44, 0.2, 1)

      // Remove main title hide
      this.$refs.animationTitle.style.opacity = 1
    },
    enter(el, done) {
      const titleSplit = splitText(this.$refs.animationTitle)

      textAnimation(
        this.timeline,
        titleSplit.slice(0, titleSplit.length - 1),
        '',
        {
          translateY: [100, 0],
        }
      )

      textAnimation(this.timeline, titleSplit[titleSplit.length - 1], '+=200', {
        translateY: [100, 0],
        delay: anime.stagger(40),
        begin: () => {
          anime({
            targets: [
              ...titleSplit.slice(1, 7),
              ...titleSplit.slice(8, 10),
              ...titleSplit.slice(11, 18),
              ...titleSplit.slice(19, 21),
            ],
            width: (el) => [el.offsetWidth, 0],
            easing: () => (t) => this.customEasing(t),
          })
        },
      })

      this.timeline
        .add(
          {
            targets: this.revealer.DOM.inner,
            duration: 1200,
            easing: 'easeInQuart',
            translateY: [0, '-100%'],
          },
          '-=700'
        )
        .add(
          {
            targets: this.revealer.DOM.reverse,
            duration: 1200,
            easing: 'easeInQuart',
            translateX: [0, '-16%'],
            translateY: [0, '100%'],
            complete: done,
          },
          '-=1200'
        )
    },
    afterEnter(el) {
      el.style.display = 'none'
      this.multiply = true
    },
    leave() {},
  },
}
</script>
