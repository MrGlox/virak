export const state = () => ({
  page: 'index',
})

export const mutations = {
  updatePage(state, pageName) {
    state.page = pageName
  },
}
