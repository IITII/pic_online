import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStore from '../store'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const logger = Vue.$log || console
  // logger.debug(routes)
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // 路由白名单
  const witheList = ['public']
  Router.beforeEach((to, from, next) => {
    // 获取或者加载 Vue Store对象
    const store = Vue.$store || VueStore
    // logger.debug(to)
    // 如果路由深度不够，无需判断
    if (to.matched.length < 2) return next()
    // 如果目标路由没有 meta 或者 roles 信息，无需判断
    if (!(to.matched[1].meta && to.matched[1].meta.roles)) {
      return next()
    }
    const roles = to.matched[1].meta.roles
    // 将用户类型转换为用户角色
    const userRole = store.getters['user/user_type']
    // 访问白名单路由
    if (witheList.some(white => roles.indexOf(white) >= 0)) {
      logger.debug('Get public routes,', witheList)
      return next()
      // 访问用户角色是否包含在目标路由角色组
    } else if (roles.some(r => userRole === r)) {
      // 包含
      logger.debug('Get user routes,', userRole, roles)
      return next()
    } else {
      // 不包含
      logger.debug('Forbidden', userRole, roles)
      // forbidden
      return next({name: 'login'})
      // return next({path: '/404'})
    }
  })
  return Router
}
