import {
  Color,
  PlaneBufferGeometry,
  ShaderMaterial,
  Uniform,
  Mesh
} from 'three'

import glslify from 'glslify'

import fragmentShader from 'assets/shaders/road.frag'
import vertexShader from 'assets/shaders/road.vert'

class Road {
  constructor(webgl, options) {
    this.webgl = webgl
    this.options = options
  }

  init() {
    const options = this.options

    const geometry = new PlaneBufferGeometry(
      options.width,
      options.length,
      20,
      200
    )

    const material = new ShaderMaterial({
      fragmentShader: glslify(fragmentShader),
      vertexShader: glslify(vertexShader),
      uniforms: {
        // eslint-disable-next-line
        uColor: new Uniform(new Color(0x101012))
      }
    })

    const mesh = new Mesh(geometry, material)

    mesh.rotation.x = -Math.PI / 2
    mesh.position.z = -options.length / 2

    this.webgl.scene.add(mesh)
  }
}

export default Road
