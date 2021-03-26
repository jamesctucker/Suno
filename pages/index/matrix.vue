<template>
  <div v-if="todos" class="Matrix w-full">
    <!-- <h1>
      Eisenhower Matrix
    </h1> -->
    <div class="flex">
      <!-- column 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-1/2 lg:w-3/4 ">
        <div class="col-span-1 w-full h-64 bg-red-400 relative rounded-md">
          <draggable
            class="list-group divide-y-2 divide-red-400 divide-solid"
            v-model="priority1"
            group="todos"
            name="one"
            @change="change($event, 'priority1', 1)"
          >
            <div
              class="list-group-item bg-red-500 relative flex items-center h-5 p-4"
              :id="`${element.id}`"
              v-for="element in priority1"
              :key="element.id"
            >
              <todo :todo="element" />
            </div>
          </draggable>
          <p class="absolute bottom-0 left-0 h-16 p-4 text-red-200">
            urgent and important
          </p>
        </div>
        <div class="col-span-1 w-full h-64 bg-yellow-500 relative rounded-md">
          <draggable
            class="list-group divide-y-2 divide-yellow-500 divide-solid"
            v-model="priority2"
            group="todos"
            @change="change($event, 'priority2', 2)"
          >
            <div
              class="list-group-item bg-yellow-600 relative flex items-center h-5 p-4"
              :id="`${element.id}`"
              v-for="element in priority2"
              :key="element.id"
            >
              <todo :todo="element" />
            </div>
          </draggable>
          <p class="absolute bottom-0 left-0 h-16 p-4 text-yellow-100">
            important but not urgent
          </p>
        </div>
        <div class="col-span-1 w-full h-64 bg-yellow-200 relative rounded-md">
          <draggable
            class="list-group divide-y-2 divide-yellow-200 divide-solid"
            v-model="priority3"
            group="todos"
            @change="change($event, 'priority3', 3)"
          >
            <div
              class="list-group-item bg-yellow-300 relativ flex items-center h-5 p-4"
              :id="`${element.id}`"
              v-for="element in priority3"
              :key="element.id"
            >
              <todo :todo="element" />
            </div>
          </draggable>
          <p class="absolute bottom-0 left-0 h-16 p-4 text-yellow-500">
            urgent but not important
          </p>
        </div>
        <div class="col-span-1 w-full h-64 bg-green-400 relative rounded-md">
          <draggable
            class="list-group divide-y-2 divide-green-400 divide-solid"
            v-model="priority4"
            group="todos"
            @change="change($event, 'priority4', 4)"
          >
            <div
              class="list-group-item bg-green-500 relative flex items-center h-5 p-4"
              :id="`${element.id}`"
              v-for="element in priority4"
              :key="element.id"
            >
              <todo :todo="element" />
            </div>
          </draggable>
          <p class="absolute bottom-0 left-0 h-16 p-4 text-green-100">
            not important or urgent
          </p>
        </div>
      </div>
      <!-- column 2 -->
      <div class="flex flex-col justify-start items-left ml-4 w-1/2 lg:w-1/4">
        <todo-input :user="user" />
        <div class="flex">
          <draggable
            class="list-group mt-4 w-full"
            v-model="unassigned"
            group="todos"
            @change="change($event, 'unassigned', 0)"
            @start="start"
            @end="end"
          >
            <div
              class="list-group-item relative flex items-center h-5 ml-2 mb-2"
              :id="`${element.id}`"
              v-for="element in unassigned"
              :key="element.todo"
            >
              <todo :todo="element" />
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import { mixin as clickaway } from "vue-clickaway";
import TodoInput from "~/components/todos/TodoInput.vue";
import Todo from "~/components/todos/Todo.vue";

export default {
  key(route) {
    return route.fullPath;
  },
  name: "Matrix",
  mixins: [clickaway],
  components: {
    draggable,
    TodoInput,
    Todo
  },
  props: {
    user: Object
  },
  data() {
    return {
      unassigned: undefined,
      priority1: undefined,
      priority2: undefined,
      priority3: undefined,
      priority4: undefined,
      dragging: false,
      reorderedList: undefined,
      isComplete: undefined
    };
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
      currentList: state => state.lists.currentList
    }),
    ...mapGetters("todos", [
      "unassignedTodos",
      "priorityOneTodos",
      "priorityTwoTodos",
      "priorityThreeTodos",
      "priorityFourTodos"
    ])
  },
  watch: {
    todos: function() {
      this.unassigned = this.unassignedTodos;
      this.priority1 = this.priorityOneTodos;
      this.priority2 = this.priorityTwoTodos;
      this.priority3 = this.priorityThreeTodos;
      this.priority4 = this.priorityFourTodos;
    },
    currentList: function() {
      this.unassigned = this.unassignedTodos;
      this.priority1 = this.priorityOneTodos;
      this.priority2 = this.priorityTwoTodos;
      this.priority3 = this.priorityThreeTodos;
      this.priority4 = this.priorityFourTodos;
    }
  },
  async fetch() {
    await this.loadTodos();
    this.unassigned = this.unassignedTodos;
    this.priority1 = this.priorityOneTodos;
    this.priority2 = this.priorityTwoTodos;
    this.priority3 = this.priorityThreeTodos;
    this.priority4 = this.priorityFourTodos;
  },
  methods: {
    ...mapActions("todos", [
      "loadTodos",
      "updatePriority",
      "updateOrder",
      "toggleComplete",
      "deleteTodo"
    ]),
    ...mapMutations("lists", ["setCurrentList"]),
    change($event, list, priority) {
      if ($event.added) {
        this.addTodo($event, priority);
      }
      if ($event.moved) {
        this.reorderTodos(list);
      }
    },
    start() {
      this.dragging = true;
    },
    end() {
      this.dragging = false;
    },
    addTodo($event, priority) {
      this.updatePriority({
        originalTodo: $event.added.element,
        newPriority: priority
      });
    },
    reorderTodos(list) {
      if (list === "unassigned") {
        this.updateOrder(this.unassigned);
      } else if (list === "priority1") {
        this.updateOrder(this.priority1);
      } else if (list === "priority2") {
        this.updateOrder(this.priority2);
      } else if (list === "priority3") {
        this.updateOrder(this.priority3);
      } else {
        this.updateOrder(this.priority4);
      }
    }
  }
};
</script>
<style scoped>
.list-group {
  height: 100%;
}
</style>
