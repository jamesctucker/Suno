import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export const state = () => ({
  authState: undefined,
  user: undefined
});

export const mutations = {
  set(state, { status, user }) {
    state.authState = status;
    state.user = user;
  }
};

export const actions = {
  checkAuthState({ commit }) {
    onAuthUIStateChange((authState, authData) => {
      console.log(authData);
      commit("set", { status: authState, user: authData });
    });
  }
};
