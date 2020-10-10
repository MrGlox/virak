/**
 * A collection of commonly used utility functions.
 */
class Util {
  /**
   * Throttles a function.
   * @param callback
   * @param wait
   * @param context
   * @returns {Function}
   */
  static throttle(callback, wait = 200, context = this) {
    let last
    let deferTimer

    return function() {
      const now = +new Date()
      const args = arguments

      if (last && now < last + wait) {
        // preserve by debouncing the last call
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function() {
          last = now
          callback.apply(context, args)
        }, wait)
      } else {
        last = now
        callback.apply(context, args)
      }
    }
  }

  /**
   * Debounces a function.
   * @param callback
   * @param wait
   * @param context
   * @returns {Function}
   */
  static debounce(callback, wait = 200, context = this) {
    let timeout = null
    let callbackArgs = null

    const later = () => callback.apply(context, callbackArgs)

    return function() {
      callbackArgs = arguments
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  static addEventListenerBySelector(className, event, fn) {
    const list = document.querySelectorAll(className)
    for (let i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false)
    }
  }

  static lerp(a, b, n) {
    return (1 - n) * a + n * b
  }

  static map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }
}

export default Util
