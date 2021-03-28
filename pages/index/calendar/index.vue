<template>
  <div class="Month w-full">
    <v-calendar
      v-if="loaded"
      class="mt-4"
      is-expanded
      :attributes="attributes"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Month",
  computed: {
    ...mapState({
      loaded: state => state.todos.loaded
    }),
    ...mapGetters("todos", ["todosWithDeadlines"]),
    attributes() {
      return [
        ...this.todosWithDeadlines.map(todo => ({
          dates: todo.deadline,
          dot: {
            color: todo.color,
            class: todo.complete ? "opacity-75" : ""
          },
          popover: {
            label: todo.name
          },
          customData: todo
        }))
      ];
    }
  },
  beforeMount() {
    if (!this.loaded) this.loadTodos();
  },
  methods: {
    ...mapActions("todos", ["loadTodos"])
  }
};
</script>
