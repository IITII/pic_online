/**
 * @author IITII
 * @date 2020/10/10 10:40
 */
'use strict';

/**
 * 判断是否为 JSON
 * @param json
 * @return {boolean}
 */
export function isJson(json) {
  try {
    let tmp = JSON.parse(json);
    return typeof tmp === 'object';
  } catch (e) {
    return false;
  }
}

/**
 * 判断是否为空
 * @param str
 * @return {boolean}
 */
export function isNil(str) {
  return str == null;
}

/**
 * 判断空串
 * @param str
 * @return {boolean}
 */
export function isEmptyString(str) {
  return isNil(str) || str === '';
}

/**
 * @description 判断是否是正确的URL
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * compare without case
 * @param str1
 * @param str2
 */
export function equalsIgnoreCase(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase();
}