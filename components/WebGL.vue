<template>
  <div :style="{ zIndex: isDebug ? 100 : 0 }" class="WebGL"></div>
</template>

<script>
const WebGL = process.browser ? require('assets/scripts').default : {}

export default {
  data() {
    return {
      isDebug: false,
      width: null,
      height: null,
      shouldUpdate: true,
      options: {
        length: 400,
        width: 20,
        roadWidth: 9,
        islandWidth: 2,
        nPairs: 50,
        roadSections: 3,
      },
    }
  },
  mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.webgl = new WebGL({
      $el: this.$refs.canvas,
      width: this.width,
      height: this.height,
      debug: this.isDebug,
      options: this.options,
    })

    this.$el.appendChild(this.webgl.renderer.domElement)

    this.onResize()
    this.bindEvents()
  },
  methods: {
    bindEvents() {
      this.$bus.$on('tick', () => {
        if (!this.shouldUpdate) {
          return
        }

        this.webgl.update()
      })

      this.$bus.$on('resize', () => {
        this.onResize()
      })

      this.$bus.$on('mousemove', this.webgl.mouseMove)
      this.$bus.$on('touchmove', this.webgl.mouseMove)
      this.$bus.$on('scroll', this.webgl.onScroll)
    },
    onResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.webgl.onResize({
        width: this.width,
        height: this.height,
      })
    },
  },
}
</script>

<style lang="scss">
.WebGL {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  touch-action: none;

  canvas {
    display: block;
    z-index: 0;
  }
}
</style>
