/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2023/02/02
 */
'use strict'
import { boot } from 'quasar/wrappers'

// 路由白名单
const witheList = ['public']
let logger = console

export default boot(({ app, router, store }) => {
  logger = app.$log || console
  router.beforeEach((to, from, next) => {
      // 获取或者加载 Vue Store对象
      // const store = Vue.$store || VueStore
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
      const token = store.state.user.token
      if (!token) {
        logger.debug('Forbidden with empty token', token)
        return next({name: 'home'})
      }
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
        // return next({name: 'home'})
        // return next({path: '/404'})
      }
    })
})
