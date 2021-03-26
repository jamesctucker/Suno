<template>
  <div v-if="showModal" class="ListsModal">
    <div class="fixed z-10 inset-0 overflow-y-auto">
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
          v-on-clickaway="close"
        >
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <!-- <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Deactivate account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed from our servers
                    forever. This action cannot be undone.
                  </p>
                </div> -->
              <div>
                <label
                  for="input"
                  class="block text-sm font-medium text-gray-700"
                  >Move to lists</label
                >
                <div class="mt-3">
                  <a
                    v-for="list in lists"
                    :key="list.id"
                    @click="moveToList(list.id)"
                    >{{ list.name }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="mt-3 text-center sm:mt-4 sm:ml-4 sm:text-left sm:flex">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
              @click="handleUpdateTodo"
            >
              Save
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "ListsModal",
  mixins: [clickaway],
  props: {
    showModal: Boolean,
    todo: Object
  },
  computed: {
    ...mapState({
      lists: state => state.lists.lists
    })
  },
  methods: {
    ...mapActions("todos", ["updateList"]),
    close(event) {
      this.$emit("closed", event);
    },
    moveToList(listId) {
      this.updateList({ originalTodo: this.todo, listId: listId });
    }
  }
};
</script>
