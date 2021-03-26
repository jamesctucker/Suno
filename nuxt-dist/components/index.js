export { default as Logo } from '../../components/Logo.vue'
export { default as ListsListMenu } from '../../components/lists/ListMenu.vue'
export { default as ListsListSelect } from '../../components/lists/ListSelect.vue'
export { default as TodosEditModal } from '../../components/todos/EditModal.vue'
export { default as TodosTodo } from '../../components/todos/Todo.vue'
export { default as TodosTodoInput } from '../../components/todos/TodoInput.vue'
export { default as TodosTodoMenu } from '../../components/todos/TodoMenu.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazyListsListMenu = import('../../components/lists/ListMenu.vue' /* webpackChunkName: "components/lists-list-menu" */).then(c => c.default || c)
export const LazyListsListSelect = import('../../components/lists/ListSelect.vue' /* webpackChunkName: "components/lists-list-select" */).then(c => c.default || c)
export const LazyTodosEditModal = import('../../components/todos/EditModal.vue' /* webpackChunkName: "components/todos-edit-modal" */).then(c => c.default || c)
export const LazyTodosTodo = import('../../components/todos/Todo.vue' /* webpackChunkName: "components/todos-todo" */).then(c => c.default || c)
export const LazyTodosTodoInput = import('../../components/todos/TodoInput.vue' /* webpackChunkName: "components/todos-todo-input" */).then(c => c.default || c)
export const LazyTodosTodoMenu = import('../../components/todos/TodoMenu.vue' /* webpackChunkName: "components/todos-todo-menu" */).then(c => c.default || c)
