import { gsap } from 'gsap'
import rightNow from 'right-now'

export default ({ app }) => {
  const maxDeltaTime = 1 / 30 // approximately 30 fps
  let lastTime = 0

  // Equivalent to requestAnimationFrame
  gsap.ticker.add(() => {
    const now = rightNow()
    const deltaTime = Math.min(maxDeltaTime, (now - lastTime) / 1000)
    lastTime = now

    // eslint-disable-next-line no-console
    if (deltaTime > 0.025) console.log('high delta', deltaTime)

    // Calculate delta time and emit to coordonnate all the app
    app.$bus.$emit('tick', deltaTime)
  })
}
