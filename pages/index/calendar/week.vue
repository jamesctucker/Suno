<template>
  <div class="Week">
    <div v-for="(day, index) in weekDays" :key="index">
      <h2>{{ day }}</h2>
      <div v-for="todo in todosForDay(day)" :key="todo.id">
        <todo :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";
import Todo from "~/components/todos/Todo.vue";

export default {
  name: "Week",
  components: {
    Todo
  },
  computed: {
    ...mapGetters("todos", ["todosWithDeadlines"]),
    weekDays() {
      return Array.from({ length: 7 }, (_, index) => {
        const start = new Date();
        const startDay = start.getDay() === 0 ? 7 : start.getDay();
        const day = start.setDate(start.getDate() - startDay + index + 1);

        return new Date(day).toISOString();
      });
    }
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
