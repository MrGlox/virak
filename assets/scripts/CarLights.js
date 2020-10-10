import * as THREE from 'three'

import fragmentShader from 'assets/shaders/trail.frag'
import vertexShader from 'assets/shaders/trail.vert'

class CarLights {
  constructor(webgl, options) {
    this.webgl = webgl
    this.options = options
  }

  init() {
    const { roadWidth, nPairs, roadSections, length } = this.options

    const curve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    )

    const baseGeometry = new THREE.TubeBufferGeometry(curve, 25, 1, 8, false)
    const instanced = new THREE.InstancedBufferGeometry().copy(baseGeometry)
    instanced.maxInstancedCount = nPairs * 2

    const aOffset = []
    const aMetrics = []

    const sectionWidth = roadWidth / roadSections

    for (let i = 0; i < nPairs; i++) {
      const radius = Math.random() * 0.1 + 0.1
      const newLength = Math.random() * length * 0.08 + length * 0.02
      // 1a. Get it's lane index
      // Instead of random, keep lights per lane consistent
      const section = i % 3

      // 1b. Get its lane's centered position
      const sectionX = section * sectionWidth - roadWidth / 2 + sectionWidth / 2
      const carWidth = 0.5 * sectionWidth
      const offsetX = 0.5 * Math.random()

      const offsetY = radius * 1.3

      const offsetZ = Math.random() * length

      aOffset.push(sectionX - carWidth / 2 + offsetX)
      aOffset.push(offsetY)
      aOffset.push(-offsetZ)

      aOffset.push(sectionX + carWidth / 2 + offsetX)
      aOffset.push(offsetY)
      aOffset.push(-offsetZ)

      aMetrics.push(radius)
      aMetrics.push(newLength)

      aMetrics.push(radius)
      aMetrics.push(newLength)
    }

    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
    )

    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false)
    )

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color(0xfafafa))
      }
    })

    // Use "Instanced" instead of "geometry"
    const mesh = new THREE.Mesh(instanced, material)
    mesh.frustumCulled = false

    this.mesh = mesh

    this.webgl.scene.add(mesh)
  }
}

export default CarLights
