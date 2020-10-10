export const state = () => ({
  timeline: null,
})

export const getters = {
  timeline: (state) => state.timeline,
}

export const mutations = {
  setTimeline(state, timeline) {
    state.timeline = timeline
  },
}
