<template>
  <div class="TodoList">
    <todo class="space-y-3" v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import Todo from "~/components/todos/Todo.vue";

export default {
  name: "TodoList",
  components: {
    Todo
  },
  props: {
    todos: Array
  }
};
</script>

<style></style>
