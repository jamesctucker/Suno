<template>
  <div v-if="todos" class="Matrix w-full">
    <!-- <h1>
      Eisenhower Matrix
    </h1> -->
    <div class="flex">
      <!-- column 1 -->
      <div class="grid grid-cols-2 gap-4 w-3/4">
        <div class="col-span-1 w-full h-64 bg-red-400 relative rounded-md">
          <draggable
            class="list-group divide-y-2 divide-red-400 divide-solid"
            v-model="priority1"
            group="todos"
            name="one"
            @change="change($event, 'priority1', 1)"
          >
            <div
              class="list-group-item bg-red-500 relative flex items-center h-5"
              :id="`${element.id}`"
              v-for="element in priority1"
              :key="element.id"
              @contextmenu.prevent="openTodoMenu($event, element.id)"
            >
              <input
                type="checkbox"
                class="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded-full"
                @change="handleChange(element)"
              />
              <p class="ml-2 text-sm font-medium text-white">
                {{ element.name }}
              </p>
              <todo-menu
                v-show="showTodoMenu && element.id === menuToShow"
                :x-position="clickX"
                :y-position="clickY"
                :todo="element"
              />
              <div
                v-show="showTodoMenu"
                class="outside"
                @click="hideTodoMenu"
              ></div>
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
              class="list-group-item bg-yellow-600 relative flex items-center h-5"
              :id="`${element.id}`"
              v-for="element in priority2"
              :key="element.id"
              @contextmenu.prevent="openTodoMenu($event, element.id)"
            >
              <input
                type="checkbox"
                class="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded-full"
                @change="handleChange(element)"
              />
              <p class="ml-2 text-sm font-medium text-white">
                {{ element.name }}
              </p>
              <todo-menu
                v-show="showTodoMenu && element.id === menuToShow"
                :x-position="clickX"
                :y-position="clickY"
                :todo="element"
              />
              <div
                v-show="showTodoMenu"
                class="outside"
                @click="hideTodoMenu"
              ></div>
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
              class="list-group-item bg-yellow-300 relativ flex items-center h-5"
              :id="`${element.id}`"
              v-for="element in priority3"
              :key="element.id"
              @contextmenu.prevent="openTodoMenu($event, element.id)"
            >
              <input
                type="checkbox"
                class="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded-full"
                @change="handleChange(element)"
              />
              <p class="ml-2 text-sm font-medium text-white">
                {{ element.name }}
              </p>
              <todo-menu
                v-show="showTodoMenu && element.id === menuToShow"
                :x-position="clickX"
                :y-position="clickY"
                :todo="element"
              />
              <div
                v-show="showTodoMenu"
                class="outside"
                @click="hideTodoMenu"
              ></div>
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
              class="list-group-item bg-green-500 relative flex items-center h-5"
              :id="`${element.id}`"
              v-for="element in priority4"
              :key="element.id"
              @contextmenu.prevent="openTodoMenu($event, element.id)"
            >
              <input
                type="checkbox"
                class="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded-full"
                @change="handleChange(element)"
              />
              <p class="ml-2 text-sm font-medium text-white">
                {{ element.name }}
              </p>
              <todo-menu
                v-show="showTodoMenu && element.id === menuToShow"
                :x-position="clickX"
                :y-position="clickY"
                :todo="element"
              />
              <div
                v-show="showTodoMenu"
                class="outside"
                @click="hideTodoMenu"
              ></div>
            </div>
          </draggable>
          <p class="absolute bottom-0 left-0 h-16 p-4 text-green-100">
            not important or urgent
          </p>
        </div>
      </div>
      <!-- column 2 -->
      <div class="flex flex-col justify-start items-left ml-4 w-1/4">
        <div class="flex flex-row items-center mr-4 ">
          <label for="todo" class="sr-only">Email</label>
          <input
            v-model="todo"
            type="text"
            name="todo"
            id="todo"
            class="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter a todo"
            @keyup.enter="create"
          />
        </div>
        <div class="flex">
          <draggable
            class="list-group mt-4"
            v-model="unassigned"
            group="todos"
            @change="change($event, 'unassigned', 0)"
            @start="start"
            @end="end"
          >
            <div
              class="list-group-item relative flex items-center h-5"
              :id="`${element.id}`"
              v-for="element in unassigned"
              :key="element.todo"
              @contextmenu.prevent="openTodoMenu($event, element.id)"
            >
              <input
                type="checkbox"
                class="focus:ring-purple-500 h-5 w-5 text-purple-600 border-gray-300 rounded-full"
                @change="handleChange(element)"
              />
              <p class="ml-2 text-sm font-medium text-gray-700">
                {{ element.name }}
              </p>
              <todo-menu
                v-show="showTodoMenu && element.id === menuToShow"
                :x-position="clickX"
                :y-position="clickY"
                :todo="element"
              />
              <div
                v-show="showTodoMenu"
                class="outside"
                @click="hideTodoMenu"
              ></div>
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
import TodoMenu from "~/components/TodoMenu.vue";

export default {
  key(route) {
    return route.fullPath;
  },
  name: "Matrix",
  components: {
    draggable,
    TodoMenu
  },
  props: {
    user: Object
  },
  data() {
    return {
      todo: undefined,
      note: undefined,
      priority: undefined,
      unassigned: undefined,
      priority1: undefined,
      priority2: undefined,
      priority3: undefined,
      priority4: undefined,
      dragging: false,
      reorderedList: undefined,
      isComplete: undefined,
      showTodoMenu: false,
      clickX: undefined,
      clickY: undefined,
      menuToShow: undefined
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
    ]),
    disabled() {
      return !this.todo;
    }
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
  mounted() {
    // this.setCurrentList(null);
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
      "createTodo",
      "loadTodos",
      "updatePriority",
      "updateOrder",
      "toggleComplete",
      "deleteTodo"
    ]),
    ...mapMutations("lists", ["setCurrentList"]),

    async create() {
      await this.createTodo({
        userID: this.user.id,
        name: this.todo,
        note: this.note
      });
      this.resetField();
    },
    resetField() {
      this.todo = undefined;
      this.note = undefined;
      this.priority = undefined;
    },
    log: function(evt) {
      console.log(evt);
    },
    change($event, list, priority) {
      if ($event.added) {
        this.addTodo($event, priority);
      }
      if ($event.moved) {
        console.log("moved!");
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
    },
    handleChange(todo) {
      console.log(todo);
      this.isComplete = !this.isComplete;
      setTimeout(async () => {
        await this.toggleComplete(todo);
        this.isComplete = !this.isComplete;
      }, 2000);
    },
    openTodoMenu($event, id) {
      console.log("todo menu!", id);
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
    }
  }
};
</script>
<style scoped>
.list-group {
  height: 100%;
}
.list-group-item {
  padding: 1em;
}
</style>
