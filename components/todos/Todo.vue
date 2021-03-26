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
        <button @click="completeTodo">
          <svg
            class="h-4 w-4"
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
      isComplete: false
    };
  },
  methods: {
    ...mapActions("todos", ["toggleComplete"]),
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
