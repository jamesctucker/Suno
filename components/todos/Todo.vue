<template>
  <div class="Todo w-full">
    <div class="todo-item flex flex-row items-center justify-between">
      <p
        class="todo-text text-sm font-medium text-gray-700 truncate"
        :class="{ 'line-through': isComplete }"
        :id="todo.id"
        @contextmenu.prevent="openTodoMenu($event, todo.id)"
        @dblclick="openEditModal(todo.id)"
      >
        {{ todo.name }}
      </p>
      <div class="todo-actions flex flex-row">
        <button
          class="p-2 hover:bg-purple-200 rounded-l focus:bg-purple-500 focus:text-white focus:border-purple-500 focus:outline-none"
          @click="completeTodo"
        >
          <svg
            class="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <v-date-picker
          v-model="date"
          class="h-full flex-end"
          @dayclick="addToCalendar"
          :min-date="new Date()"
        >
          <template v-slot="{ togglePopover, inputValue }">
            <div class="flex items-center">
              <button
                class="p-2 hover:bg-purple-200 rounded-l focus:bg-purple-500 focus:text-white focus:border-purple-500 focus:outline-none"
                @click="togglePopover()"
              >
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <input
                v-if="todo.deadline"
                :value="inputValue"
                class="bg-white text-gray-700 w-1/2 py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-purple-500"
                readonly
              />
            </div>
          </template>
        </v-date-picker>
      </div>
    </div>
    <!-- action modals -->
    <todo-menu
      v-show="showTodoMenu && todo.id === menuToShow"
      v-on-clickaway="hideTodoMenu"
      :x-position="clickX"
      :y-position="clickY"
      :todo="todo"
    />
    <edit-modal
      :is-open="showEditModal && todo.id === modalToShow"
      :todo="todo"
      @closed="hideEditModal"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
import TodoMenu from "~/components/todos/TodoMenu.vue";
import EditModal from "~/components/todos/EditModal.vue";

export default {
  name: "Todo",
  mixins: [clickaway],
  props: {
    todo: Object
  },
  components: {
    TodoMenu,
    EditModal
  },
  data() {
    return {
      showTodoMenu: false,
      clickX: undefined,
      clickY: undefined,
      menuToShow: undefined,
      modalToShow: undefined,
      showEditModal: false,
      isComplete: false,
      date: undefined
    };
  },
  mounted() {
    this.date = this.todo.deadline ? this.todo.deadline : new Date();
  },
  methods: {
    ...mapActions("todos", ["toggleComplete", "updateDeadline"]),
    openTodoMenu($event, id) {
      this.menuToShow = id;
      let element = document.getElementById(id);

      const rect = element.getBoundingClientRect();
      this.clickX = $event.clientX - rect.left;
      this.clickY = $event.clientY - rect.top;

      this.showTodoMenu = true;
    },
    hideTodoMenu() {
      this.showTodoMenu = false;
      this.menuToShow = undefined;
      this.clickX = undefined;
      this.clickY = undefined;
    },
    openEditModal(id) {
      this.modalToShow = id;
      this.showEditModal = true;
    },
    hideEditModal() {
      this.modalToShow = undefined;
      this.showEditModal = false;
    },
    completeTodo() {
      this.isComplete = true;
      setTimeout(async () => {
        await this.toggleComplete(this.todo);
        this.isComplete = false;
      }, 1500);
    },
    addToCalendar(day) {
      this.updateDeadline({
        todo: this.todo,
        datetime: day.date.toISOString()
      });
    }
  }
};
</script>
<style scoped>
.todo-item .todo-actions {
  visibility: hidden;
}
.todo-item:hover .todo-actions {
  visibility: visible;
}
</style>
