import { DataStore, Predicates } from "aws-amplify";
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
  unassignedTodos(state) {
    return state.todos
      .filter(todo => todo.priority === 0)
      .sort((a, b) => a.order - b.order);
  },
  priorityOneTodos(state) {
    return state.todos.filter(todo => todo.priority === 1);
  },
  priorityTwoTodos(state) {
    return state.todos.filter(todo => todo.priority === 2);
  },
  priorityThreeTodos(state) {
    return state.todos.filter(todo => todo.priority === 3);
  },
  priorityFourTodos(state) {
    return state.todos.filter(todo => todo.priority === 4);
  }
};

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
    state.loaded = true;
  }
};

export const actions = {
  async createTodo({ dispatch }, { userID, name, note }) {
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
  }
};
