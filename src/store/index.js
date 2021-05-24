import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import uiControl from './modules/ui_control'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const moduleNames = [
  './modules/user',
  './modules/ui_control',
  './modules/common',
]

const Store = new Vuex.Store({
  modules: {
    user,
    common,
    uiControl
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.NODE_ENV === 'production' || false
})
if (module.hot) {
  module.hot.accept(moduleNames, () => {
    // 重新获取更新后的模块对象
    const newUser = require('./modules/user').default
    const newCommon = require('./modules/common').default
    const newUiControl = require('./modules/ui_control').default
    // 热重载模块
    Store.hotUpdate({
      modules: {
        // admin: newAdmin,
        user: newUser,
        common: newCommon,
        uiControl: newUiControl
      }
    })
  })
}

// 默认情况下 store 比 route 晚挂载, 所以就会出现一个尴尬的延误情况
// 而且如果 export function 的话，每一次 import 本文件，都会创建一个新的 store 实例
// 为了方便路由判断，需要共用一个 Vuex store 实例，这里直接采取 export Vuex 实例
export default Store
