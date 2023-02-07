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

// https://github.com/developit/mitt/issues/136#issuecomment-1032324692
eventBus.once = function (type, handler) {
  const fn = (arg) => {
    eventBus.off(type, fn);
    handler(arg);
  };
  eventBus.on(type, fn);
  // add a property to the handler
  handler._ = fn;
  // or
  // return this handler
  return fn;
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
