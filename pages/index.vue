<template>
  <div class="container">
    <amplify-authenticator
      v-if="authState !== 'signedin'"
      class="container"
      handle-submit="createNewUser"
    />
    <div v-if="authState === 'signedin' && authUser">
      <CBox
        d="flex"
        w="100vw"
        flex-dir="column"
        justify-content="center"
        align-items="center"
      >
        <CHeading text-align="center" mb="4">
          Hello {{ authUser.username }}.
        </CHeading>
        <CButton variant-color="green" mb="4" max-w="125px" @click="signOut"
          >Sign Out</CButton
        >
        <NuxtChild :user="currentUser" :todos="todos" />
        <nuxt-link to="/focus">Focus</nuxt-link>
        <nuxt-link to="/matrix">Prioritize</nuxt-link>
      </CBox>
    </div>
  </div>
</template>

<script lang="js">
import { mapActions, mapState, mapGetters } from 'vuex';
import { Auth }  from 'aws-amplify';

import {
  CBox,
  CButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'

export default {
  key(route) {
    return route.fullPath
  },
  name: 'App',
  components: {
    CBox,
    CButton,
    CFlex,
    CHeading
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  watch: {
    authState: function() {
      if (this.authState === 'signedin') {
        return this.loadUser(this.authUser);
      }
    },
    currentUser: function() {
      return this.loadToDos(this.currentUser.id)
    }
  },
  computed: {
    ...mapState({
      authState: state => state.auth.authState,
      authUser: state => state.auth.user,
      currentUser: state => state.user.user,
      todos: state => state.todos.todos
    }),
    ...mapGetters('auth', ['isSignedIn']),
    theme () {
      return this.$chakraTheme()
    },
  },
  created() {
    this.checkAuthState();
  },
  beforeDestroy() {
    return this.checkAuthState();
  },
  methods: {
    ...mapActions('auth', ['checkAuthState']),
    ...mapActions('user', ['loadUser']),
    ...mapActions('todos', ['loadToDos']),
    signOut: async () => Auth.signOut()
  }
}
</script>
<style>
amplify-authenticator {
  width: 50%;
}
</style>
