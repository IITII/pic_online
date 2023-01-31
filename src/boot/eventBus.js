'use strict'

import {boot} from 'quasar/wrappers'
import mitt from 'mitt'

const eventBus = mitt()

const defaultOptions = {
    global: true,
    inject: true,
    globalPropertyName: '$eventBus',
    injectName: '$eventBus'
  },
  opts = {
    global: true,
    inject: false,
    globalPropertyName: '$bus',
    injectName: '$bus'
  }

export default boot(({app}) => {
  let opt = {
    ...defaultOptions,
    ...opts
  }
  if (opt.global) {
    app.config.globalProperties[opt.globalPropertyName] = eventBus
  }
  if (opt.inject) {
    app.provide(opt.injectName, eventBus)
  }
})

export {eventBus}
