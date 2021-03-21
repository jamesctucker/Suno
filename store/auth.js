import { onAuthUIStateChange, AuthState } from "@aws-amplify/ui-components";

export const state = () => ({
  authState: undefined,
  user: undefined
});

export const getters = {
  isSignedIn(state) {
    return state.authState === "signedin";
  }
};

export const mutations = {
  set(state, { status, user }) {
    state.authState = status;
    state.user = user;
  }
};

export const actions = {
  checkAuthState({ commit, dispatch }) {
    onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.ConfirmSignUp) {
        dispatch("user/findOrCreateUser", authData, { root: true });
      }
      commit("set", { status: nextAuthState, user: authData });
      if (nextAuthState === "signedin") {
        dispatch("user/loadUser", authData, { root: true });
      }
    });
  }
};
