import { DataStore, Predicates } from "aws-amplify";
import { Todo } from "../src/models";

export const state = () => ({
  todos: undefined
});

export const mutations = {
  setToDos(state, todos) {
    state.todos = todos;
  }
};

export const actions = {
  async createToDo({ dispatch }, { userID, name, note, priority }) {
    try {
      const response = await DataStore.save(
        new Todo({
          userID: userID,
          name: name,
          note: note,
          priority: priority,
          complete: false
        })
      );

      dispatch("loadToDos", userID);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  async loadToDos({ commit }, userID) {
    // const response = await API.graphql(
    //   graphqlOperation(todoByUserId, { userID: userID })
    // );
    const response = await DataStore.query(Todo, todo =>
      todo.userID("eq", userID)
    );
    console.log("fetched todos", response);
    commit("setToDos", response);
  }
};
