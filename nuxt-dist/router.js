import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7acdc780 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _8e37a86e = () => interopDefault(import('../pages/index/focus.vue' /* webpackChunkName: "pages/index/focus" */))
const _30083ca0 = () => interopDefault(import('../pages/index/matrix.vue' /* webpackChunkName: "pages/index/matrix" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _7acdc780,
    name: "index",
    children: [{
      path: "focus",
      component: _8e37a86e,
      name: "index-focus"
    }, {
      path: "matrix",
      component: _30083ca0,
      name: "index-matrix"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
