<template>
  <div
    :class="
      `TodoMenu absolute top-${yPosition} left-${xPosition} text-left z-10`
    "
  >
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <a
          href="#"
          class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          @click="openListsModal"
        >
          <!-- Heroicon name: solid/arrow-circle-right -->
          <svg
            class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Move to list
        </a>
      </div>
      <div class="py-1" role="none">
        <a
          href="#"
          class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          @click.prevent="handleDelete"
        >
          <!-- Heroicon name: solid/trash -->
          <svg
            class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Delete
        </a>
      </div>
    </div>
    <lists-modal
      :show-modal="showListsModal"
      @closed="closeListsModal"
      :todo="todo"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ListsModal from "../lists/ListsModal.vue";

export default {
  name: "TodoMenu",
  components: { ListsModal },
  props: {
    xPosition: Number,
    yPosition: Number,
    todo: Object
  },
  data() {
    return {
      showListsModal: false
    };
  },
  methods: {
    ...mapActions("todos", ["deleteTodo"]),
    handleDelete() {
      this.deleteTodo(this.todo);
    },
    openListsModal() {
      this.showListsModal = true;
    },
    closeListsModal() {
      this.showListsModal = false;
    }
  }
};
</script>

<style>
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>
