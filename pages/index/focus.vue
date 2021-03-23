<template>
  <div class="Focus">
    <p v-if="focusTodo">{{ focusTodo.name }}</p>
    <p v-else>you're all caught up! go relax!</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Focus",
  props: {
    user: Object,
    todos: Array
  },
  computed: {
    ...mapGetters("todos", ["focusTodo"])
  }
};
</script>
