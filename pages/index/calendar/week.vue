<template>
  <div class="Week">
    <ul class="space-y-3">
      <li v-for="(day, index) in weekDays" :key="index">
        <week-list :day="day" />
      </li>
    </ul>
  </div>
</template>

<script>
import WeekList from "~/components/calendar/WeekList.vue";
const dayjs = require("dayjs");
const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

export default {
  name: "Week",
  components: {
    WeekList
  },
  computed: {
    weekDays() {
      return [
        dayjs().weekday(0),
        dayjs().weekday(1),
        dayjs().weekday(2),
        dayjs().weekday(3),
        dayjs().weekday(4),
        dayjs().weekday(5)
      ];
    }
  }
};
</script>
