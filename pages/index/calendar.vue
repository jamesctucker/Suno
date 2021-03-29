<template>
  <div class="Calendar w-full">
    <div class="flex flex-row justify-between">
      <span class="relative z-0 inline-flex shadow-sm rounded-md mb-4">
        <nuxt-link
          to="/calendar"
          type="button"
          class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        >
          Month
        </nuxt-link>
        <nuxt-link
          to="/calendar/week"
          type="button"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        >
          Week
        </nuxt-link>
        <nuxt-link
          to="/calendar/today"
          type="button"
          class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        >
          Today
        </nuxt-link>
      </span>
      <span
        v-if="lists"
        class="inline-flex shadow-sm rounded-md divide-x divide-purple-600"
      >
        <div>
          <label id="listbox-label" class="sr-only">
            Filter todos
          </label>
          <div class="relative">
            <div
              class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600"
            >
              <div
                class="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white"
              >
                <p class="ml-2.5 text-sm font-medium">
                  {{ currentList.name }}
                </p>
              </div>
              <button
                type="button"
                class="relative inline-flex items-center bg-purple-500 p-2 rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                @click="toggleSelect"
              >
                <span class="sr-only">{{
                  currentList ? currentList.name : lists[0].name
                }}</span>
                <!-- Heroicon name: solid/chevron-down -->
                <svg
                  class="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!--
        Select popover, show/hide based on select state.

        Entering: ""
          From: ""
          To: ""
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <ul
              v-if="isOpen"
              class="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-0"
            >
              <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-purple-500", Not Highlighted: "text-gray-900"
        -->
              <li
                v-for="list in listsWithCustomAll"
                :key="list.id"
                class="text-gray-900 cursor-default select-none relative p-4 text-sm"
                id="listbox-option-0"
                role="option"
                @click="setList(list)"
              >
                <div class="flex flex-col">
                  <div class="flex justify-between">
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <p class="font-normal">
                      {{ list.name }}
                    </p>
                    <!--
                Checkmark, only display for selected option.

                Highlighted: "text-white", Not Highlighted: "text-purple-500"
              -->
                    <span
                      v-if="currentList.id === list.id"
                      class="text-purple-500"
                    >
                      <!-- Heroicon name: solid/check -->
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <!-- Highlighted: "text-purple-200", Not Highlighted: "text-gray-500" -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </span>
    </div>
    <nuxt-child :current-list="currentList" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Calendar",
  data() {
    return {
      isOpen: false,
      currentList: {
        id: 0,
        name: "All"
      }
    };
  },
  computed: {
    ...mapState({
      loaded: state => state.todos.loaded,
      lists: state => state.lists.lists
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
    },
    listsWithCustomAll() {
      const customAll = [{ id: 0, name: "All" }];
      return customAll.concat(this.lists);
    }
  },
  beforeMount() {
    if (!this.loaded) this.loadTodos();
  },
  methods: {
    ...mapActions("todos", ["loadTodos"]),
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
    setList(list) {
      this.currentList = list;
    }
  }
};
</script>
