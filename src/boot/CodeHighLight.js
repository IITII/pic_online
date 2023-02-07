/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2023/02/02
 */
'use strict'

import { boot } from 'quasar/wrappers'
import VueHighlightJS from 'vue3-highlightjs'
let appIns = null

export default boot(({ app }) => {
  appIns = app
  app.use(VueHighlightJS)
})

export { appIns }
