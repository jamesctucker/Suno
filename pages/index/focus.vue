<template>
  <div class="Focus">
    <c-heading text-align="center">Focus</c-heading>
    <p v-if="focusToDo">{{ focusToDo.name }}</p>
    <p v-else>you're all caught up! go relax!</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters("todos", ["focusToDo"])
  }
};
</script>
