/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/04 10:27
 */
'use strict'

export function getDocumentHeight(win = window, doc = document) {
  return win.innerHeight ? win.innerHeight
    : (doc.body && doc.body.clientHeight) ? doc.body.clientHeight : win.screen.availHeight
}

export function getDocumentWidth(win = window, doc = document) {
  return win.innerWidth ? win.innerWidth
    : (doc.body && doc.body.clientWidth) ? doc.body.clientWidth : win.screen.availWidth
}

/**
 * validate email address is valid or not
 * @param email email address
 * @returns {boolean} true from valid, false for invalid
 */
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * userType map to route
 * @param {Number} userType
 */
export function userTypeToRoute(userType) {
  return `/${userTypeToRouteRoles(userType)}`
}

/**
 * do something after login
 * @param user data
 * @param store Vuex Store
 * @param router Vue Router
 * @param axios Axios Instance
 * @param redirect {Boolean} redirect after login, default: true
 * @param redirectPath {String} redirect path, default: `/${user.user_type}/image`
 */
export function afterLogin(user, store, router, axios, redirect = true, redirectPath = '') {
  store.dispatch('user/user', user)
  // reset after re-create Vue instance, such as page reload
  axios.defaults.headers['authorization'] = ['Token', user.token].join(' ')
  if (redirect) {
    router.push({path: redirectPath || `/${user.user_type}/image`})
  }
}

/**
 * do something after logout
 * @param store Vuex Store
 * @param axios Axios Instance
 */
export function afterLogout(store, axios) {
  store.dispatch('user/logout')
  axios.defaults.headers['authorization'] = ''
}

/**
 * deep check a obj is equal to another
 * @returns {boolean} true for equal, false for not
 */
export function isEqual(value, other) {
  if (typeof value !== typeof other) return false
  if (typeof value !== 'object') return value === other
  try {
    for (const k in value) {
      if (!isEqual(value[k], other[k])) {
        return false
      }
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * Custom bg color base on user role
 * @param role user role
 * @param bgColor Prefer color
 */
export function bgClassBaseOnRole(role, bgColor = '') {
  const pink = ['admin', 'maintainer']
  if (bgColor) {
    return `${bgColor} text-white`
  } else {
    if (pink.some(r => r === role)) {
      return 'bg-pink-4 text-white'
    } else {
      return 'bg-primary text-white'
    }
  }
}

export function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    // ie
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')

    link.href = window.URL.createObjectURL(blob) // 创建对象url
    link.download = filename

    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href) // 通过调用 URL.createObjectURL() 创建的 URL 对象
  }
}

export function downloadFile(url, fileName) {
  const link = document.createElement('a')
  const body = document.querySelector('body')

  link.href = url
  link.download = fileName
  link.target = '_blank'

  // fix Firefox
  link.style.display = 'none'
  body.appendChild(link)

  link.click()
  body.removeChild(link)
}
