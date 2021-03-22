<template>
  <div class="ListSelect">
    <c-flex direction="column" align="left">
      <c-list mb="4">
        <c-list-item v-for="list in lists" :key="list.id">{{
          list.name
        }}</c-list-item>
      </c-list>
      <c-button @click="open">new list +</c-button>
      <!-- modal for creating new list -->
      <c-modal :is-open="isOpen" :on-close="close">
        <c-modal-content ref="content">
          <c-modal-header>Modal Title</c-modal-header>
          <c-modal-close-button />
          <c-modal-body>
            <p>add a new list</p>
            <c-input v-model="listName"></c-input>
          </c-modal-body>
          <c-modal-footer>
            <c-button variant-color="blue" mr="3" @click="createNewList">
              Save
            </c-button>
            <c-button @click="close">Cancel</c-button>
          </c-modal-footer>
        </c-modal-content>
        <c-modal-overlay />
      </c-modal>
    </c-flex>
  </div>
</template>

<script>
import {
  CInput,
  CList,
  CListItem,
  CButton,
  CFlex,
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton
} from "@chakra-ui/vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "ListSelect",
  components: {
    CInput,
    CList,
    CListItem,
    CButton,
    CFlex,
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton
  },
  data() {
    return {
      selectedList: undefined,
      listName: undefined,
      isOpen: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      lists: state => state.lists.lists
    })
  },
  methods: {
    ...mapActions("lists", ["createList"]),
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    createNewList() {
      this.createList({
        name: this.listName,
        user: this.user
      });
    }
  }
};
</script>
