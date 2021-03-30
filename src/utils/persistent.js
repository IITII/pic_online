/**
 * @author iitii
 * @date 2020/12/12 11:25
 */
'use strict'
const general = 'pic_online_',
  customPrefix = 'custom_',
  uiPrefix = 'ui_',
  apiPrefix = 'api_'

const getItem = key => {
  return localStorage.getItem(general + key)
}

const setItem = (key, value) => {
  return localStorage.setItem(general + key, value)
}

const customGetItem = key => {
  return getItem(customPrefix + key)
}

const customSetItem = (key, value) => {
  return setItem(customPrefix + key, value)
}

const apiGetItem = key => {
  return getItem(apiPrefix + key)
}

const apiSetItem = (key, value) => {
  return setItem(apiPrefix + key, value)
}

const uiGetItem = key => {
  return getItem(uiPrefix + key)
}

const uiSetItem = (key, value) => {
  return setItem(uiPrefix + key, value)
}

export default {
  customGetItem,
  customSetItem,
  apiGetItem,
  apiSetItem,
  uiGetItem,
  uiSetItem
}
