import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9c9f92a4 = () => interopDefault(import('../pages/datasets/index.vue' /* webpackChunkName: "pages/datasets/index" */))
const _4ac69029 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _641f42a5 = () => interopDefault(import('../pages/user-settings.vue' /* webpackChunkName: "pages/user-settings" */))
const _4c050da2 = () => interopDefault(import('../pages/datasets/useDatasetsViewModel.ts' /* webpackChunkName: "pages/datasets/useDatasetsViewModel" */))
const _fdc225dc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _62604298 = () => interopDefault(import('../pages/dataset/_id/annotation-mode/index.vue' /* webpackChunkName: "pages/dataset/_id/annotation-mode/index" */))
const _d9c2bf02 = () => interopDefault(import('../pages/dataset/_id/settings.vue' /* webpackChunkName: "pages/dataset/_id/settings" */))
const _48f6d7b8 = () => interopDefault(import('../pages/dataset/_id/useDatasetSettingViewModel.ts' /* webpackChunkName: "pages/dataset/_id/useDatasetSettingViewModel" */))
const _43973204 = () => interopDefault(import('../pages/dataset/_id/useDatasetViewModel.ts' /* webpackChunkName: "pages/dataset/_id/useDatasetViewModel" */))
const _385303d0 = () => interopDefault(import('../pages/dataset/_id/annotation-mode/useAnnotationModeViewModel.ts' /* webpackChunkName: "pages/dataset/_id/annotation-mode/useAnnotationModeViewModel" */))
const _7ee29e1e = () => interopDefault(import('../pages/datasets/_workspace/_dataset/index.vue' /* webpackChunkName: "pages/datasets/_workspace/_dataset/index" */))
const _2c31b554 = () => interopDefault(import('../pages/datasets/_workspace/_dataset/settings.vue' /* webpackChunkName: "pages/datasets/_workspace/_dataset/settings" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/datasets",
    component: _9c9f92a4,
    name: "datasets"
  }, {
    path: "/login",
    component: _4ac69029,
    name: "login"
  }, {
    path: "/user-settings",
    component: _641f42a5,
    name: "user-settings"
  }, {
    path: "/datasets/useDatasetsViewModel",
    component: _4c050da2,
    name: "datasets-useDatasetsViewModel"
  }, {
    path: "/",
    component: _fdc225dc,
    name: "index"
  }, {
    path: "/dataset/:id?/annotation-mode",
    component: _62604298,
    name: "dataset-id-annotation-mode"
  }, {
    path: "/dataset/:id?/settings",
    component: _d9c2bf02,
    name: "dataset-id-settings"
  }, {
    path: "/dataset/:id?/useDatasetSettingViewModel",
    component: _48f6d7b8,
    name: "dataset-id-useDatasetSettingViewModel"
  }, {
    path: "/dataset/:id?/useDatasetViewModel",
    component: _43973204,
    name: "dataset-id-useDatasetViewModel"
  }, {
    path: "/dataset/:id?/annotation-mode/useAnnotationModeViewModel",
    component: _385303d0,
    name: "dataset-id-annotation-mode-useAnnotationModeViewModel"
  }, {
    path: "/datasets/:workspace/:dataset",
    component: _7ee29e1e,
    name: "datasets-workspace-dataset"
  }, {
    path: "/datasets/:workspace/:dataset?/settings",
    component: _2c31b554,
    name: "datasets-workspace-dataset-settings"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
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
