const state = {
  token: "",
};

const mutations = {
  set_token(state, token) {
    state.token = token;
    sessionStorage.token = token;
  },
  remove_token(state) {
    state.token = "";
    sessionStorage.removeItem("token");
  },
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};
