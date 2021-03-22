<template>
  <div v-if="todos" class="Matrix">
    <CHeading text-align="center" mb="4" mt="8">
      Eisenhower Matrix
    </CHeading>
    <c-flex>
      <list-select />
      <c-flex justify="start" align="left" direction="column">
        <c-flex mr="4" direction="row" align="center">
          <c-input
            v-model="todo"
            type="text"
            placeholder="todo..."
            max-width="300px"
            m="2"
            @keyup.enter="create"
          />
        </c-flex>
        <c-flex>
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
        </c-flex>
      </c-flex>
      <c-grid w="600px" template-columns="repeat(2, 1fr)" gap="4"
        ><c-box w="100%" h="64" bg="red.300"
          ><draggable
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
          </draggable></c-box
        >
        <c-box w="100%" h="64" bg="orange.300"
          ><draggable
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
          </draggable></c-box
        >
        <c-box w="100%" h="64" bg="yellow.300"
          ><draggable
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
          </draggable></c-box
        >
        <c-box w="100%" h="64" bg="green.300"
          ><draggable
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
          </draggable></c-box
        ></c-grid
      >
    </c-flex>
  </div>
</template>

<script>
import {
  CInput,
  CSelect,
  CButton,
  CFlex,
  CList,
  CListItem,
  CHeading,
  CGrid,
  CBox
} from "@chakra-ui/vue";
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";
import ListSelect from "~/components/ListSelect.vue";

export default {
  key(route) {
    return route.fullPath;
  },
  name: "Matrix",
  components: {
    CInput,
    CSelect,
    CButton,
    CFlex,
    CListItem,
    CList,
    CHeading,
    CGrid,
    CBox,
    draggable,
    ListSelect
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
      priority2: [],
      priority3: [],
      priority4: [],
      dragging: false,
      reorderedList: undefined
    };
  },
  watch: {
    todos: function() {
      this.unassigned = this.todos
        .filter(todo => todo.priority === 0)
        .sort((a, b) => a.order - b.order);
      this.priority1 = this.todos.filter(todo => todo.priority === 1);
      this.priority2 = this.todos.filter(todo => todo.priority === 2);
      this.priority3 = this.todos.filter(todo => todo.priority === 3);
      this.priority4 = this.todos.filter(todo => todo.priority === 4);
    }
  },
  computed: {
    ...mapState({ todos: state => state.todos.todos }),
    disabled() {
      return !this.todo;
    }
  },
  methods: {
    ...mapActions("todos", [
      "createToDo",
      "loadToDos",
      "updatePriority",
      "updateOrder"
    ]),
    async create() {
      await this.createToDo({
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
        this.addToDo($event, priority);
      }
      if ($event.moved) {
        console.log("moved!");
        this.reorderToDos(list);
      }
    },
    start() {
      this.dragging = true;
    },
    end() {
      this.dragging = false;
    },
    addToDo($event, priority) {
      this.updatePriority({
        originalToDo: $event.added.element,
        newPriority: priority
      });
    },
    reorderToDos(list) {
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
