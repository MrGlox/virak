import anime from 'animejs'

class Revealer {
  constructor(el, options) {
    this.options = {
      angle: 0,
      ...options,
    }

    this.DOM = {}
    this.DOM.el = el
    this.DOM.inner = el.firstElementChild

    this.DOM.inner.style.width = `calc(100vw * ${Math.abs(
      Math.cos((this.options.angle * Math.PI) / 180)
    )} + 100vh * ${Math.abs(Math.sin((this.options.angle * Math.PI) / 180))})`

    this.DOM.inner.style.height = `calc(100vw * ${Math.abs(
      Math.sin((this.options.angle * Math.PI) / 180)
    )} + 100vh * ${Math.abs(Math.cos((this.options.angle * Math.PI) / 180))})`

    this.DOM.el.style.transform = `rotate3d(0,0,1,${this.options.angle}deg)`

    this.DOM.reverse = this.DOM.inner.querySelector('.content__reverse')

    if (this.DOM.reverse) {
      anime.set(this.DOM.reverse, {
        rotateZ: -1 * this.options.angle,
      })

      this.DOM.el.style.zIndex = 100
    }
  }
}

export default Revealer
