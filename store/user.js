import { DataStore } from "aws-amplify";
import { User } from "../src/models";

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
      //   const user = await API.graphql(
      //     graphqlOperation(userByUserName, { username: authUser.username })
      //   );
      //   console.log(user.data.userByUserName.items[0]);
      const user = await DataStore.query(User, u =>
        u.username("eq", authUser.username)
      );
      console.log(user);
      commit("setUser", user[0]);
    } catch (error) {
      console.log(error);
    }
  },
  async findOrCreateUser({ commit }, authData) {
    try {
      await DataStore.save(new User({ username: authData.username }));
    } catch (error) {
      console.error(error);
    }
  }
};
