import { WebGLRenderer } from 'three'

class Renderer extends WebGLRenderer {
  // eslint-disable-next-line
  constructor(color = 0xfffff, alpha = 1) {
    super({
      antialias: true,
      failIfMajorPerformanceCaveat: true,
      powerPreference: 'high-performance',
    })

    // this.setPixelRatio(window.devicePixelRatio)
    this.setClearColor(color, alpha)
    // this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
    this.setPixelRatio(Math.min(2, window.devicePixelRatio))
  }
}

export default Renderer
