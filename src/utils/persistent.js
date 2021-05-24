/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2020/12/12 11:25
 */
'use strict'
export const prefix = {
  general: 'pic_',
  common: 'c_',
  user: 'u_',
  ui: 'ui_'
}

// basic
const getI = (key, storage) => storage.getItem(prefix.general + key)
const setI = (key, value, storage) => storage.setItem(prefix.general + key, value)
const removeI = (key, storage) => storage.removeItem(prefix.general + key)
//get
const commonGet = (key, storage = localStorage) => getI(prefix.common + key, storage)
const userGet = (key, storage = localStorage) => getI(prefix.user + key, storage)
const uiGet = (key, storage = localStorage) => getI(prefix.ui + key, storage)
//set
const commonSet = (key, value, storage = localStorage) => setI(prefix.common + key, value, storage)
const userSet = (key, value, storage = localStorage) => setI(prefix.user + key, value, storage)
const uiSet = (key, value, storage = localStorage) => setI(prefix.ui + key, value, storage)
//remove
const commonRemove = (key, storage = localStorage) => removeI(prefix.common + key, storage)
const userRemove = (key, storage = localStorage) => removeI(prefix.user + key, storage)
const uiRemove = (key, storage = localStorage) => removeI(prefix.ui + key, storage)


export default {
  commonGet,
  commonSet,
  commonRemove,
  userGet,
  userSet,
  userRemove,
  uiGet,
  uiSet,
  uiRemove
}
