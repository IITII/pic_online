/**
 * @author IITII
 * @date 2020/10/10 9:23
 */

'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import local_op from '@/utils/data_persistent';

Vue.use(Vuex);

const local_setting = local_op.get() || {};
// console.log(`url: ${local_setting.url}, isUrl: ${isUrl(local_setting.url)}`);
const state = {
  // 需要考虑 url 不以 http 开头的情况
  url: local_setting.url || '../static/mock/data.json',
  method: ['GET', 'POST'].indexOf(local_setting.method) >= 0
    ? local_setting.method
    : 'GET',
};
const getters = {
  url: state => state.url,
  method: state => state.method,
};
const mutations = {
  changeUrl(state, newUrl) {
    state.url = newUrl;
  },
  changeMethod(state, method) {
    state.method = method;
  },
};
const actions = {
  changeUrl({commit}, newUrl) {
    commit('changeUrl', newUrl);
    // update localStorage data
    // maybe we need a debounce at here
    local_setting.url = newUrl;
    local_op.update(local_setting);
  },
  changeMethod({commit}, method) {
    commit('changeMethod', method);
    // update localStorage data
    // maybe we need a debounce at here
    local_setting.method = method;
    local_op.update(local_setting);
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}