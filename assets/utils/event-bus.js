import Vue from 'vue'

export const EventBus = new Vue()

export const waitRenderThenEmit = (eventName) => {
  setTimeout(() => {
    EventBus.$emit(eventName)
  }, 0)
}

export const waitRenderThenBind = (eventName, callback) => {
  setTimeout(() => {
    EventBus.$on(eventName, callback)
  }, 0)
}
