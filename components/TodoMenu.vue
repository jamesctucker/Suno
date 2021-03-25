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
        >
          <!-- Heroicon name: solid/archive -->
          <svg
            class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path
              fill-rule="evenodd"
              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Archive
        </a>
        <a
          href="#"
          class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
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
          Move
        </a>
      </div>
      <div class="py-1" role="none">
        <a
          href="#"
          class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          <!-- Heroicon name: solid/user-add -->
          <svg
            class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
            />
          </svg>
          Share
        </a>
        <a
          href="#"
          class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          <!-- Heroicon name: solid/heart -->
          <svg
            class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
          Add to favorites
        </a>
      </div>
      <div class="py-1" role="none">
        <a
          href="#"
          class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
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
  </div>
</template>

<script>
export default {
  name: "TodoMenu",
  props: {
    xPosition: Number,
    yPosition: Number,
    todo: Object
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
