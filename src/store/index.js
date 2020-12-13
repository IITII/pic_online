// See: https://quasar.dev/quasar-cli/vuex-store

import Vue from 'vue'
import Vuex from 'vuex'

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

const modulesName = [
  './modules/api_setting',
  './modules/ui_control'
]

import apiSetting from './modules/api_setting'
import uiControl from './modules/ui_control'

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      apiSetting,
      uiControl
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV || false
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (process.env.DEV && module.hot) {
    module.hot.accept(modulesName, () => {
      const newApiSetting = require('./modules/api_setting').default
      const newUiControl = require('./modules/ui_control').default
      Store.hotUpdate({
        modules: {
          apiSetting: newApiSetting,
          uiControl: newUiControl
        }
      })
    })
  }

  return Store
}
