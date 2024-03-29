/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2020/12/12 11:25
 */
'use strict'
export const prefix = {
  general: 'pic_',
  common: 'c_',
  user: 'u_',
  image: 'i_',
  video: 'v_',
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
const imageGet = (key, storage = localStorage) => getI(prefix.image + key, storage)
const videoGet = (key, storage = localStorage) => getI(prefix.video + key, storage)
//set
const commonSet = (key, value, storage = localStorage) => setI(prefix.common + key, value, storage)
const userSet = (key, value, storage = localStorage) => setI(prefix.user + key, value, storage)
const uiSet = (key, value, storage = localStorage) => setI(prefix.ui + key, value, storage)
const imageSet = (key, value, storage = localStorage) => setI(prefix.image + key, value, storage)
const videoSet = (key, value, storage = localStorage) => setI(prefix.video + key, value, storage)
//remove
const commonRemove = (key, storage = localStorage) => removeI(prefix.common + key, storage)
const userRemove = (key, storage = localStorage) => removeI(prefix.user + key, storage)
const uiRemove = (key, storage = localStorage) => removeI(prefix.ui + key, storage)
const imageRemove = (key, storage = localStorage) => removeI(prefix.image + key, storage)
const videoRemove = (key, storage = localStorage) => removeI(prefix.video + key, storage)


export default {
  commonGet,
  commonSet,
  commonRemove,
  imageGet,
  imageSet,
  imageRemove,
  videoGet,
  videoSet,
  videoRemove,
  userGet,
  userSet,
  userRemove,
  uiGet,
  uiSet,
  uiRemove
}
