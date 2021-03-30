<template>
  <div class="Today bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ today }}
      </h3>
    </div>
    <div class="bg-gray-50 px-4 py-5 sm:p-6">
      <todo v-for="todo in todosForToday" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
const dayjs = require("dayjs");
import { mapGetters } from "vuex";
import Todo from "~/components/todos/Todo.vue";

export default {
  name: "Today",
  components: {
    Todo
  },
  computed: {
    ...mapGetters("todos", ["todosWithDeadlines"]),
    today() {
      // TODO: update locale here to be dynamic with Vue-i18n lib, so names can be translated into their local versions
      const date = new Date();
      return `${date.toLocaleDateString("en-US", { weekday: "long" })}, ${dayjs(
        new Date()
      ).format("MMMM D")}`;
    },
    //  used to check with each todo's ISO datetime
    formattedDay() {
      return dayjs(new Date()).format("YYYY-MM-DD");
    },
    todosForToday() {
      return this.todosWithDeadlines.filter(
        todo => todo.deadline.slice(0, 10) === this.formattedDay
      );
    }
  }
};
</script>
