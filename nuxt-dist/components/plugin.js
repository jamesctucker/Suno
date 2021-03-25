import Vue from 'vue'

const components = {
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  ListsListMenu: () => import('../../components/lists/ListMenu.vue' /* webpackChunkName: "components/lists-list-menu" */).then(c => c.default || c),
  ListsListSelect: () => import('../../components/lists/ListSelect.vue' /* webpackChunkName: "components/lists-list-select" */).then(c => c.default || c),
  TodosEditModal: () => import('../../components/todos/EditModal.vue' /* webpackChunkName: "components/todos-edit-modal" */).then(c => c.default || c),
  TodosTodoMenu: () => import('../../components/todos/TodoMenu.vue' /* webpackChunkName: "components/todos-todo-menu" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
