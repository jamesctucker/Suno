import { DataStore } from "aws-amplify";
import { List, User } from "../src/models";

export const state = () => ({
  lists: undefined,
  currentList: undefined
});

export const mutations = {
  setLists(state, lists) {
    state.lists = lists;
  },
  setCurrentList(state, currentList) {
    state.currentList = currentList;
  }
};

export const actions = {
  async loadLists({ commit }, userId) {
    const response = await DataStore.query(List);
    commit("setLists", response);
  },
  async createList({ dispatch }, { name, user }) {
    const response = await DataStore.save(
      new List({
        name: name,
        User: user,
        Todos: []
      })
    );
    console.log(response);
    dispatch("loadLists", response.User.id);
  },
  async deleteList() {}
};
