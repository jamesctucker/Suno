<template>
  <div class="TodoInput flex flex-row items-center mr-4 ">
    <label for="todo" class="sr-only">New Todo</label>
    <input
      v-model="todo"
      type="text"
      name="todo"
      id="todo"
      class="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder="Enter a todo"
      @keyup.enter="create"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodoInput",
  props: {
    user: Object
  },
  data() {
    return {
      todo: undefined
    };
  },
  methods: {
    ...mapActions("todos", ["createTodo"]),
    async create() {
      if (this.todo) {
        await this.createTodo({
          userID: this.user.id,
          name: this.todo
        });
        this.resetField();
      }
    },
    resetField() {
      this.todo = undefined;
    }
  }
};
</script>
