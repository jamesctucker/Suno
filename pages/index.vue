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
        <p v-if="isOnline">You are ONLINE</p>
        <p v-else>You are OFFLINE</p>
        <p v-show="isSynced">SYNCED!</p>
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
import { Hub } from 'aws-amplify';

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
  data() {
    return {
      isOnline: false,
      isSynced: false
    }
  },
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
    Hub.listen('datastore', (data) => {
      if (data.payload.event === 'networkStatus') {
        this.isOnline = data.payload.data.active;
        if (!data.payload.data.active) {
          this.isSynced = false;
        }
      }
      if (data.payload.data?.isDeltaSync) {
       this.isSynced = data.payload.data.isDeltaSync
      }
      console.log(data)
    })
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
