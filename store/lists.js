import { DataStore } from "aws-amplify";
import { List, User } from "../src/models";

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
    const response = await DataStore.save(
      new List({
        name: name,
        User: user,
        Todos: []
      })
    );
    console.log(response);
    dispatch("loadLists");
  },
  async deleteList() {}
};
