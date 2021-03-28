<template>
  <div class="Week">
    <div v-for="(day, index) in weekDays" :key="index">
      <week-list :day="day" />
    </div>
  </div>
</template>

<script>
import WeekList from "~/components/calendar/WeekList.vue";

export default {
  name: "Week",
  components: {
    WeekList
  },
  computed: {
    weekDays() {
      return Array.from({ length: 7 }, (_, index) => {
        const start = new Date();
        const startDay = start.getDay() === 0 ? 7 : start.getDay();
        const day = start.setDate(start.getDate() - startDay + index + 1);

        return new Date(day).toISOString();
      });
    }
  }
};
</script>
