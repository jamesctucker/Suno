<template>
  <div class="Focus">
    <c-heading text-align="center">Focus</c-heading>
    <p v-if="currentToDo">{{ currentToDo.name }}</p>
    <p v-else>you're all caught up! go relax!</p>
  </div>
</template>

<script>
import { CHeading } from "@chakra-ui/vue";

export default {
  name: "Focus",
  components: {
    CHeading
  },
  props: {
    user: Object,
    todos: Array
  },
  computed: {
    currentToDo() {
      if (this.todos) {
        return this.todos.filter(todo => todo.complete === false).shift();
      } else {
        return undefined;
      }
    }
  }
};
</script>
