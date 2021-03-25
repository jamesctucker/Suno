import { DataStore } from "aws-amplify";
import { List } from "../src/models";

export const state = () => ({
  lists: null,
  currentList: null
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
  async loadLists({ commit }) {
    const response = await DataStore.query(List);
    commit("setLists", response);
  },
  async createList({ dispatch }, { name, user }) {
    await DataStore.save(
      new List({
        name: name,
        User: user,
        Todos: []
      })
    );
    dispatch("loadLists");
  },
  async deleteList({ dispatch }, list) {
    await DataStore.delete(list);
    dispatch("loadLists");
  }
};
