<template>
  <div class="ListSelect flex flex-col justify-between space-y-1 px-2 h-full">
    <div class="flex flex-col mt-8">
      <div
        v-for="list in lists"
        :id="`${list.id}`"
        :key="list.id"
        @click="goToList(list)"
      >
        <a
          class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md relative"
        >
          <svg
            class="mr-3 h-6 w-6 text-purple-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p @contextmenu.prevent="openListMenu($event, list.id)">
            {{ list.name }}
          </p>
          <list-menu
            v-show="listMenuIsOpen && list.id === menuToShow"
            :x-position="clickX"
            :y-position="clickY"
            :list="list"
            @closed="closeListMenu"
          />
          <div
            v-show="listMenuIsOpen"
            class="outside z-20 bg-gray-300 bg-opacity-20"
            @click="closeListMenu"
          ></div>
        </a>
      </div>
    </div>

    <button
      type="button"
      class="group flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
      @click="open"
    >
      <svg
        class="mr-1 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      create new list
    </button>

    <!--  Create new list modal -->
    <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div>
                <label
                  for="input"
                  class="block text-sm font-medium text-gray-700"
                  >Add List</label
                >
                <div class="mt-3">
                  <input
                    v-model="listName"
                    type="text"
                    name="input"
                    id="input"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter a list name"
                    @keydown.enter="createNewList"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center sm:mt-4 sm:ml-4 sm:text-left sm:flex">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
              :disabled="disabled"
              @click="createNewList"
            >
              Create
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ListMenu from "./ListMenu.vue";

export default {
  components: { ListMenu },
  name: "ListSelect",
  components: {
    ListMenu
  },
  data() {
    return {
      listName: undefined,
      isOpen: false,
      menuToShow: undefined,
      clickY: undefined,
      clickX: undefined,
      listMenuIsOpen: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      lists: state => state.lists.lists
    }),
    disabled() {
      return this.listName === undefined || this.listName === "";
    }
  },
  methods: {
    ...mapActions("lists", ["createList"]),
    ...mapMutations("lists", ["setCurrentList"]),
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    async createNewList() {
      await this.createList({
        name: this.listName,
        user: this.user
      });
      this.isOpen = false;
      this.listName = undefined;
    },
    openListMenu($event, id) {
      this.menuToShow = id;

      let element = document.getElementById(id);
      const rect = element.getBoundingClientRect();
      this.clickX = $event.clientX - rect.left;
      this.clickY = $event.clientY - rect.top;

      this.listMenuIsOpen = true;
    },
    closeListMenu() {
      this.listMenuIsOpen = false;
      this.menuToShow = undefined;
      this.clickX = undefined;
      this.clickY = undefined;
    },
    async goToList(list) {
      await this.setCurrentList(list.id);
      this.$router.push("/matrix");
    }
  }
};
</script>
