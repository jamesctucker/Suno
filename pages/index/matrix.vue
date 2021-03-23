<template>
  <div v-if="todos" class="Matrix w-full">
    <!-- <h1>
      Eisenhower Matrix
    </h1> -->
    <div class="flex">
      <!-- column 1 -->
      <div class="grid grid-cols-2 gap-4 w-3/4">
        <div class="col-span-1 w-full h-64 bg-red-400">
          <draggable
            class="list-group"
            v-model="priority1"
            group="todos"
            name="one"
            @change="change($event, 'priority1', 1)"
          >
            <div
              class="list-group-item"
              v-for="element in priority1"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
        <div class="col-span-1 w-full h-64 bg-yellow-500">
          <draggable
            class="list-group"
            v-model="priority2"
            group="todos"
            @change="change($event, 'priority2', 2)"
          >
            <div
              class="list-group-item"
              v-for="element in priority2"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
        <div class="col-span-1 w-full h-64 bg-yellow-300">
          <draggable
            class="list-group"
            v-model="priority3"
            group="todos"
            @change="change($event, 'priority3', 3)"
          >
            <div
              class="list-group-item"
              v-for="element in priority3"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
        <div class="col-span-1 w-full h-64 bg-green-400">
          <draggable
            class="list-group"
            v-model="priority4"
            group="todos"
            @change="change($event, 'priority4', 4)"
          >
            <div
              class="list-group-item"
              v-for="element in priority4"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
      <!-- column 2 -->
      <div class="flex flex-col justify-start items-left ml-4 w-1/4">
        <div class="flex flex-row items-center mr-4 ">
          <input
            v-model="todo"
            type="text"
            placeholder="todo..."
            @keyup.enter="create"
          />
        </div>
        <div class="flex">
          <draggable
            class="list-group"
            v-model="unassigned"
            group="todos"
            @change="change($event, 'unassigned', 0)"
            @start="start"
            @end="end"
          >
            <div
              class="list-group-item"
              v-for="element in unassigned"
              :key="element.todo"
            >
              {{ element.name }}
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

export default {
  key(route) {
    return route.fullPath;
  },
  name: "Matrix",
  components: {
    draggable
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
      reorderedList: undefined
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
    this.unassigned = this.unassignedTodos;
    this.priority1 = this.priorityOneTodos;
    this.priority2 = this.priorityTwoTodos;
    this.priority3 = this.priorityThreeTodos;
    this.priority4 = this.priorityFourTodos;
    // this.setCurrentList(null);
  },
  methods: {
    ...mapActions("todos", [
      "createTodo",
      "loadTodos",
      "updatePriority",
      "updateOrder"
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
    async mounted() {
      this.loadTodos();
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
    }
  }
};
</script>
<style scoped>
.list-group {
  height: 100%;
}

.list-group-item {
  padding: 8px 0px 8px 16px;
}
</style>
