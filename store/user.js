import { DataStore } from "aws-amplify";
import { User } from "../src/models";

export const state = () => ({
  user: undefined,
  loaded: false
});

export const mutations = {
  setUser(state, data) {
    state.user = data;
    state.loaded = !!data;
  }
};

export const actions = {
  async loadUser({ commit, dispatch }) {
    try {
      if (!state.loaded) {
        const user = await DataStore.query(User);
        commit("setUser", user[0]);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async findOrCreateUser(_, authData) {
    try {
      await DataStore.save(new User({ username: authData.username }));
    } catch (error) {
      console.error(error);
    }
  }
};
