<template>
  <div class="Matrix">
    <c-flex justify="center" align="center" direction="column">
      <c-input
        v-model="todo"
        type="text"
        placeholder="todo..."
        max-width="300px"
        m="2"
      />
      <c-select
        v-model="priority"
        placeholder="Priority"
        max-width="300px"
        m="2"
        ><option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option><option value="4">4</option></c-select
      >
      <c-button
        m="2"
        :is-disabled="disabled"
        variant-color="green"
        @click="create"
        >add</c-button
      >
      <h1>Todos</h1>
      <c-list v-if="todos">
        <c-list-item v-for="(todo, index) in todos" :key="index">{{
          todo.name
        }}</c-list-item>
      </c-list>
    </c-flex>
  </div>
</template>

<script>
import {
  CInput,
  CSelect,
  CButton,
  CFlex,
  CList,
  CListItem
} from "@chakra-ui/vue";
import { mapActions, mapState } from "vuex";

export default {
  key(route) {
    return route.fullPath;
  },
  name: "Matrix",
  components: {
    CInput,
    CSelect,
    CButton,
    CFlex,
    CListItem,
    CList
  },
  props: {
    user: Object,
    todos: Array
  },
  data() {
    return {
      todo: undefined,
      note: undefined,
      priority: undefined
    };
  },
  computed: {
    // ...mapState({
    //   // user: state => state.user.user,
    //   todos: state => state.todos.todos
    // }),
    disabled() {
      return !this.todo;
    }
  },
  watch: {
    user: function() {
      return this.loadToDos(this.user.id);
    }
  },
  methods: {
    ...mapActions("todos", ["createToDo", "loadToDos"]),
    async create() {
      await this.createToDo({
        userID: this.user.id,
        name: this.todo,
        note: this.note,
        priority: this.priority
      });
      this.resetField();
      return this.showToast();
    },
    resetField() {
      this.todo = undefined;
      this.note = undefined;
      this.priority = undefined;
    },
    showToast() {
      this.$toast({
        title: "Success",
        description: "Your todo is now on someone else's computer",
        status: "info",
        duration: 10000
      });
    }
  }
};
</script>
