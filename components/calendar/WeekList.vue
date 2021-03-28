<template>
  <div v-if="todosWithDeadlines" class="WeekList">
    <h2>{{ day }}</h2>
    <div v-for="todo in todosForDay(day)" :key="todo.id">
      <todo :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "~/components/todos/Todo.vue";

export default {
  name: "WeekList",
  components: {
    Todo
  },
  props: {
    day: String
  },
  computed: {
    ...mapGetters("todos", ["todosWithDeadlines"])
  },
  methods: {
    todosForDay(date) {
      const todos = this.todosWithDeadlines.filter(
        todo => todo.deadline.slice(0, 10) === date.slice(0, 10)
      );

      return todos;
    }
  }
};
</script>
