/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2023/02/02
 */
'use strict'

import { boot } from 'quasar/wrappers'
let appIns = null

export default boot(({ app }) => {
  appIns = app
})

export { appIns }
