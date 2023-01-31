'use strict'

import {boot} from 'quasar/wrappers'
import logger from 'vuejs3-logger'

// https://quasar.dev/quasar-cli/handling-process-env#values-supplied-by-quasar-cli
const isProduction = process.env.PROD,
  isDev = process.env.DEV

const options = {
  isEnabled: isDev,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

export default boot(({app}) => {
  app.use(logger, options)
})

export {logger}
