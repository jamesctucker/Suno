<template>
  <div class="Month w-full">
    <v-calendar v-if="loaded" is-expanded :attributes="attributes" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Month",
  props: {
    currentList: Object
  },
  computed: {
    ...mapState({
      loaded: state => state.todos.loaded
    }),
    ...mapGetters("todos", ["todosWithDeadlines"]),
    attributes() {
      return [
        ...this.filterTodosByCurrentList.map(todo => ({
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
    },
    filterTodosByCurrentList() {
      if (this.currentList.name === "All") {
        return this.todosWithDeadlines;
      } else {
        return this.todosWithDeadlines.filter(
          todo => todo.listID === this.currentList.id
        );
      }
    }
  }
};
</script>
