/**
 * @author IITII
 * @date 2020/10/6 22:45
 */
'use strict';
let map = null;

/**
 * read cookies from dom
 */
function parseCookies() {
  let cookie = document.cookie;
  cookie = cookie.split(';').map(v => {
    v = v.trim();
    return v.split('=');
  });
  map = new Map(cookie);
}

/**
 * 清除原有 cookies 后，将 map 中的数据重新添加到 cookies
 */
function stringifyCookies() {
  cleanCookie();
  let tmp = [];
  for (let keyValue of map) {
    tmp.push(keyValue.join('='));
  }
  document.cookie = tmp.join(';');
}

/**
 * remove all cookies
 */
function cleanCookie() {
  const keys = map.keys();
  for (let key of keys) {
    deleteCookie(key);
  }
}

/**
 * delete cookies by key
 * @param key key
 */
function deleteCookie(key) {
  // const date = new Date(0);
  const date = 'Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = `${key}=; expires=${date}`;
}

/**
 * 设置cookies
 * @param key key
 * @param value value
 * @param expireDays 过期时间，不设置即为会话结束后过期
 */
function setCookie(key, value, expireDays = 0) {
  if (expireDays > 0 || expireDays < 0) {
    let date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    map.set(key, `${key}=${value}; expires=${date.toGMTString()}`);
  } else {
    map.set(key, value);
  }
}

/**
 * 通过 cookies 的key 来获取
 * @param key key
 * @return {string} value
 */
function getCookieValueByKey(key) {
  let tmp = map.get(key);
  if (tmp === undefined) {
    return '';
  }
  return tmp;
}

export default {
  parseCookies,
  stringifyCookies,
  deleteCookie,
  cleanCookie,
  setCookie,
  getCookieValueByKey,
};