import {
  AmbientLight,
  Fog,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
} from 'three'

import createTouches from 'touches'

import Renderer from './renderer'

import Tube from './tube'

class WebGL {
  constructor({ $el, width, height, options }) {
    this.$canvas = $el
    this.width = width
    this.height = height
    this.options = options

    // this.clock = new Clock()
    this.maxDeltaTime = 1 / 30

    // eslint-disable-next-line
    this.renderer = new Renderer(0x161616)
    this.scene = new Scene()

    // eslint-disable-next-line
    this.scene.fog = new Fog(0x333333, 10, 30)

    this.camera = new PerspectiveCamera(45, width / height, 0.1, 10000)

    this.lastTime = performance.now()
    this.aspect = width / height

    this.time = 0

    // really basic touch handler that propagates through the scene
    this.touchHandler = createTouches(window, {
      target: window,
      filtered: true,
      preventSimulated: false,
    })

    this.tube = new Tube(this, options)

    this.initElements()
    this.createLights()

    this.plane = this.createPlane()

    this.initElements = this.initElements.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  initElements() {
    this.camera.position.z = -100
    this.camera.position.y = 7
    this.camera.position.x = 0

    this.tube.init()
  }

  createLights() {
    // eslint-disable-next-line
    this.ambientLight = new AmbientLight(0xffffff)
    this.scene.add(this.ambientLight)
  }

  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    )
    return { width: height * this.camera.aspect, height }
  }

  createPlane() {
    const geometry = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({})

    const mesh = new Mesh(geometry, material)
    this.scene.add(mesh)

    return mesh
  }

  update() {
    const now = Date.now()
    const dt = Math.min(this.maxDeltaTime, (now - this.lastTime) / 1000)

    this.time += dt
    this.lastTime = now

    // recursively tell all child objects to update
    this.scene.traverse(
      (obj) => typeof obj.update === 'function' && obj.update(dt, this.time)
    )

    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)
  }

  traverse(fn, ...args) {
    this.scene.traverse(
      (child) => typeof child[fn] === 'function' && child[fn].apply(child, args)
    )
  }

  mouseMove(ev) {}

  onResize({ width, height }) {
    this.width = width
    this.height = height

    this.renderer.setSize(width, height)

    this.traverse('onResize', {
      width: this.width,
      height: this.height,
    })
  }
}

export default WebGL
