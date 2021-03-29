<template>
  <div v-if="todosWithDeadlines" class="WeekList ">
    <div class="bg-white px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ weekday }}, {{ humanReadableDate }}
      </h3>
    </div>
    <div class="px-4 py-2 sm:px-6" v-for="todo in todosForDay" :key="todo.id">
      <todo :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "~/components/todos/Todo.vue";
const dayjs = require("dayjs");
const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

export default {
  name: "WeekList",
  components: {
    Todo
  },
  props: {
    day: Object
  },
  computed: {
    ...mapGetters("todos", ["todosWithDeadlines"]),
    humanReadableDate() {
      return dayjs(this.day.$d).format("MMMM D");
    },
    weekday() {
      // TODO: update locale here to be dynamic with Vue-i18n lib, so names can be translated into their local versions
      const date = new Date(this.day.$d);
      return date.toLocaleDateString("en-US", { weekday: "long" });
    },
    formattedDay() {
      return dayjs(this.day.$d).format("YYYY-MM-DD");
    },
    todosForDay() {
      return this.todosWithDeadlines.filter(
        todo => todo.deadline.slice(0, 10) === this.formattedDay
      );
    }
  }
};
</script>
