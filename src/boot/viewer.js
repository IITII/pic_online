/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2023/02/02
 */
'use strict'

import { boot } from 'quasar/wrappers'
// import {component as Viewer} from 'v-viewer'
import VueViewer from 'v-viewer'

export default boot(({ app }) => {
  app.use(VueViewer)
})
