import {
  DoubleSide,
  TorusBufferGeometry,
  Mesh,
  MeshNormalMaterial,
} from 'three'

class Tube {
  constructor(webgl, options) {
    this.webgl = webgl
    this.options = options
  }

  init() {
    // const {} = this.options

    const geometry = new TorusBufferGeometry(4, 0.6, 15, 40, 90)
    const material = new MeshNormalMaterial({
      side: DoubleSide,
    })

    const mesh = new Mesh(geometry, material)

    this.webgl.scene.add(mesh)
  }
}

export default Tube
