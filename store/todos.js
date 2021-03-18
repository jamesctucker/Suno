import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../src/graphql/mutations";
import { todoByUserId } from "../src/graphql/queries";

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
      const todo = {
        userID: userID,
        name: name,
        note: note,
        priority: priority,
        complete: false
      };
      const response = await API.graphql(
        graphqlOperation(createTodo, { input: todo })
      );

      dispatch("loadToDos", userID);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  async loadToDos({ commit }, userID) {
    const response = await API.graphql(
      graphqlOperation(todoByUserId, { userID: userID })
    );
    commit("setToDos", response.data.todoByUserID.items);
  }
};
