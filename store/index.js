export const state = () => ({
  datas: {},
  projects: [],
})

export const computed = {
  datas(state) {
    return state
  },
}

export const getters = {
  datas: (state) => state.datas,
  projects: (state) => state.projects,
  footer: (state) => state.datas.acf.footer,
}

export const mutations = {
  setDatas(state, datas) {
    state.datas = datas
  },
  setProjects(state, projects) {
    state.projects = projects
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, { store }) {},
}
