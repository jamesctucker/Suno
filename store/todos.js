import { DataStore, Predicates } from "aws-amplify";
import { Todo } from "../src/models";

export const state = () => ({
  todos: undefined,
  loaded: false
});

export const getters = {
  focusToDo(state) {
    return state.todos
      .filter(todo => todo.priority > 0)
      .sort((a, b) => a.priority - b.priority)
      .shift();
  }
};

export const mutations = {
  setToDos(state, todos) {
    state.todos = todos;
    state.loaded = true;
  }
};

export const actions = {
  async createToDo({ dispatch }, { userID, name, note }) {
    try {
      const response = await DataStore.save(
        new Todo({
          userID: userID,
          name: name,
          note: note,
          priority: 0,
          complete: false
        })
      );
      dispatch("loadToDos", response.userID);
    } catch (error) {
      console.log(error);
    }
  },
  async loadToDos({ commit }, userID) {
    const response = await DataStore.query(Todo, todo =>
      todo.userID("eq", userID)
    );
    commit("setToDos", response);
  },
  async updatePriority({ dispatch }, { originalToDo, newPriority }) {
    try {
      console.log(originalToDo);
      const response = await DataStore.save(
        Todo.copyOf(originalToDo, todo => {
          todo.priority = newPriority;
        })
      );
      dispatch("loadToDos", response.userID);
    } catch (error) {
      console.log(error);
    }
  },
  updateOrder({ dispatch }, originals) {
    try {
      console.dir(originals);
      const response = originals.map((o, index) => {
        DataStore.save(
          Todo.copyOf(o, updated => {
            updated.order = index;
          })
        );
      });
      console.dir("update response", response);
      //   dispatch("loadToDos", response.userID);
    } catch (error) {
      console.error(error);
    }
  }
};
