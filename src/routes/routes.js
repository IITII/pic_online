/**
 * @author IITII
 * @date 2020/10/8 13:49
 */
'use strict';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
  path: '/',
  component: () => import('../App.vue'),
  children: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('../views/home'),
    },
    // 外链跳转
    {
      path: 'outer_link/:param',
      component: () => import('../views/waterfall/waterfall'),
    },
    {
      path: '*',
      component: () => import('../views/404')
    }
  ]
}];

const routerFactory = () => new Router({
  // mode: 'history', // require service support
  // 滚动行为，详见 https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA
  scrollBehavior: () => ({y: 0}),
  routes: routes
})
const router = routerFactory();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = routerFactory();
  router.matcher = newRouter.matcher; // reset router
}

export default router;