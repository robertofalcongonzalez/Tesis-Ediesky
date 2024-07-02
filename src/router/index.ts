/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(`/`),
  extendRoutes: (routes) => setupLayouts(routes),

})
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.name !== '/Login') {
    return next({name: '/Login'})
  }
  return next();
})

export default router
