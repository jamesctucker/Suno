import { createUser } from "../src/graphql/mutations";
import { userByUserName } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const state = () => ({
  user: undefined
});

export const mutations = {
  setUser(state, data) {
    state.user = data;
  }
};

export const actions = {
  async loadUser({ commit }, authUser) {
    try {
      const user = await API.graphql(
        graphqlOperation(userByUserName, { username: authUser.username })
      );
      console.log(user.data.userByUserName.items[0]);
      commit("setUser", user.data.userByUserName.items[0]);
    } catch (error) {
      console.log(error);
    }
  },
  async findOrCreateUser({ commit }, authData) {
    try {
      const newUser = { username: authData.username };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    } catch (error) {
      console.error(error);
    }
  }
};
