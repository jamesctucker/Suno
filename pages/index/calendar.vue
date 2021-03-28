<template>
  <div class="Calendar w-full">
    <span class="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Month
      </button>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Week
      </button>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Day
      </button>
    </span>
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
  name: "Calendar",
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
