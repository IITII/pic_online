/**
 * @author IITII
 * @date 2020/10/10 9:09
 */

'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

/**
 * Generate namespace for getter
 * @param modules
 * @deprecated 数据反正都是临时计算生成的，这样做意义不大
 */
// function getNamespace(modules) {
//   let namespace = {
//     api_setting: {}
//   };
//   Object.keys(modules).forEach(key => {
//     namespace[key] = {};
//     Object.keys(modules[key].getters).forEach(getter => {
//       namespace[key][getter] = `${key}/${getter}`;
//     });
//   });
//   return namespace;
// }

/**
 * 加载所有模块。
 */
function loadModules() {
  //See: https://www.webpackjs.com/guides/dependency-management/#require-context
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i);
  
  const modules = context
    .keys()
    // 为什么一定要是 /([a-z_]+)\.js$/i)[1], 不能有以数字开头的文件吗？
    // 可是可以，但是考虑到命名规范所以不行
    .map(key => ({key, name: key.match(/([a-z_]+)\.js$/i)[1]}))
    .reduce(
      (modules, {key, name}) => ({
        ...modules,
        [name]: context(key).default
      }),
      {}
    );
  Object.keys(modules).forEach((key) => {
    //默认注册在全局命名空间，但是为了更高的封装度和复用性也为了避免命名冲突，采用 namespace = true;
    //See: https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4
    modules[key]['namespaced'] = true;
  });
  return {context, modules};
}

const {context, modules} = loadModules();
// export let namespace = getNamespace(modules);

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
});
// module hot update
//See: https://vuex.vuejs.org/zh/guide/hot-reload.html#%E7%83%AD%E9%87%8D%E8%BD%BD
if (module.hot) {
  // 在任何模块发生改变时进行热重载。
  module.hot.accept(context.id, () => {
    const {modules} = loadModules();
    // namespace = getNamespace(modules);
    store.hotUpdate({
      modules,
    });
  });
}

export default store;