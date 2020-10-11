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

/**
 * 判断是否为电脑
 * @return {boolean} true for pc
 */
export function isPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let isPc = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      isPc = false;
      break;
    }
  }
  return isPc;
}

/**
 * 自适应性布局
 * @param pc 电脑端布局
 * @param mobile 手机端布局
 * @return {*} 适应性布局
 */
export function adaptiveLayout(pc, mobile) {
  // 电脑端，drawer size 始终设置为 30%
  if (isPC()) {
    return pc;
  }
  // 手机端，进行 3:2 检测
  if (screen.width * 3 > screen.height * 2) {
    return pc;
  } else {
    return mobile;
  }
}