export default {
  namespaced: true,
  state: {
    networkState: ''
  },
  mutations: {
    updateNetworkState(state, payload) {
      state.networkState = payload.networkState
    }
  }
}
