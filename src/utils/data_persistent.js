/**
 * @author IITII
 * @date 2020/10/10 10:26
 * base on localStorage
 */

'use strict';
import {isJson} from '@/utils/validate';

const default_key = 'pic_online_front';

/**
 * add new key-value pair to localStorage
 * @param val
 * @param key
 */
export function set(val, key = default_key) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  return localStorage.setItem(key, val);
}

/**
 * update value by key
 * @param val
 * @param key
 */
export function update(val, key = default_key) {
  // console.log(`val: ${JSON.stringify(val)}, key:${key}`);
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  return localStorage.setItem(key, val);
}

/**
 * get value by key, if value is json format, return json
 * @param key
 * @return {string|any}
 */
export function get(key = default_key) {
  let tmp = localStorage.getItem(key);
  if (isJson(tmp)) {
    tmp = JSON.parse(tmp);
  }
  return tmp || {};
}

/**
 * remove key-value pair by key
 * @param key
 */
export function remove(key = default_key) {
  return localStorage.removeItem(key);
}

/**
 * remove all key-value pair on localStorage
 */
export function removeAll() {
  return localStorage.clear();
}

export default {
  set,
  update,
  get,
  remove,
  removeAll
}