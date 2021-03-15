<template>
  <div class="container">
    <amplify-authenticator v-if="authState !== 'signedin'" class="container" />
    <div v-if="authState === 'signedin' && user">
      <CBox
        v-bind="mainStyles[colorMode]"
        d="flex"
        w="100vw"
        h="100vh"
        flex-dir="column"
        justify-content="center"
        align-items="center"
      >
        <CHeading text-align="center" mb="4">
          Hello {{ user.name }}, welcome to Suno!
        </CHeading>
        <CButton variant-color="green" mb="4" max-w="125px" @click="signOut"
          >Sign Out</CButton
        >
        <CFlex justify="center" direction="column" align="center">
          <CBox mb="3">
            <CIconButton
              mr="3"
              :icon="colorMode === 'light' ? 'moon' : 'sun'"
              :aria-label="
                `Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`
              "
              @click="toggleColorMode"
            />
          </CBox>
        </CFlex>
      </CBox>
    </div>
  </div>
</template>

<script lang="js">
import { mapActions, mapState } from 'vuex';
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      },
    }
  },
  computed: {
    ...mapState({
      authState: state => state.auth.authState,
      user: state => state.auth.user
    }),
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
  },
  created() {
    this.checkAuthState();
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
  methods: {
    ...mapActions('auth', ['checkAuthState']),
    showToast () {
      this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true
      })
    },
    signOut: async () => Auth.signOut()
  }
}
</script>
