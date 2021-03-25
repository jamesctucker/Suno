import { DataStore } from "aws-amplify";
import { deleteTodo } from "~/src/graphql/mutations";
import { Todo } from "../src/models";

export const state = () => ({
  todos: undefined,
  loaded: false
});

export const getters = {
  focusTodo(state) {
    return state.todos
      .filter(todo => todo.priority > 0)
      .sort((a, b) => a.priority - b.priority)
      .shift();
  },
  unassignedTodos(state, getters, rootState) {
    return state.todos
      .filter(
        todo =>
          todo.priority === 0 &&
          !todo.complete &&
          todo.listID === rootState.lists.currentList
      )
      .sort((a, b) => a.order - b.order);
  },
  priorityOneTodos(state, getters, rootState) {
    return state.todos.filter(
      todo =>
        todo.priority === 1 &&
        !todo.complete &&
        todo.listID === rootState.lists.currentList
    );
  },
  priorityTwoTodos(state, getters, rootState) {
    return state.todos.filter(
      todo =>
        todo.priority === 2 &&
        !todo.complete &&
        todo.listID === rootState.lists.currentList
    );
  },
  priorityThreeTodos(state, getters, rootState) {
    return state.todos.filter(
      todo =>
        todo.priority === 3 &&
        !todo.complete &&
        todo.listID === rootState.lists.currentList
    );
  },
  priorityFourTodos(state, getters, rootState) {
    return state.todos.filter(
      todo =>
        todo.priority === 4 &&
        !todo.complete &&
        todo.listID === rootState.lists.currentList
    );
  }
};

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
    state.loaded = true;
  },
  setCurrentList(state, list) {
    state.currentList = list;
  }
};

export const actions = {
  async createTodo({ dispatch, rootState }, { userID, name, note }) {
    try {
      const response = await DataStore.save(
        new Todo({
          userID: userID,
          name: name,
          note: note,
          priority: 0,
          complete: false,
          listID: rootState.lists.currentList
        })
      );
      dispatch("loadTodos", response.userID);
    } catch (error) {
      console.log(error);
    }
  },
  async loadTodos({ commit }) {
    const response = await DataStore.query(Todo);
    commit("setTodos", response);
  },
  async updatePriority({ dispatch }, { originalTodo, newPriority }) {
    try {
      console.log(originalTodo);
      const response = await DataStore.save(
        Todo.copyOf(originalTodo, todo => {
          todo.priority = newPriority;
        })
      );
      dispatch("loadTodos", response.userID);
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
      //   dispatch("loadTodos", response.userID);
    } catch (error) {
      console.error(error);
    }
  },
  async toggleComplete({ dispatch }, original) {
    const response = await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.complete = !original.complete;
      })
    );
    console.log(response);
    dispatch("loadTodos");
  },
  async deleteTodo({ dispatch }, todo) {
    const response = await DataStore.delete(todo);
    console.log(response);
  }
};
