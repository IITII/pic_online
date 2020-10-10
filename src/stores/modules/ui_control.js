/**
 * @author IITII
 * @date 2020/10/10 11:10
 */
'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import local_op from '@/utils/data_persistent';

Vue.use(Vuex);

const local_setting = local_op.get() || {};
const state = {
  // showPicTitle: local_setting.showPicTitle || false,
  showSettingDialog: local_setting.showSettingDialog || false,
  checkboxGroup: local_setting.checkboxGroup || [],
};
const getters = {
  // showPicTitle: state => state.showPicTitle,
  showSettingDialog: state => state.showSettingDialog,
  checkboxGroup: state => state.checkboxGroup,
};
const mutations = {
  // reverseShowPicTitle(state) {
  //   state.showPicTitle = !state.showPicTitle;
  // },
  // setShowPicTitle(state, status) {
  //   state.showPicTitle = status;
  // },
  reverseShowSettingDialog(state) {
    state.showSettingDialog = !state.showSettingDialog;
  },
  setCheckboxGroup(state, arr) {
    state.checkboxGroup = arr;
  },
};
const actions = {
  // reverseShowPicTitle({commit}) {
  //   commit('reverseShowPicTitle');
  //   // update localStorage data
  //   // maybe we need a debounce at here
  //   local_setting.showPicTitle = getters.showPicTitle;
  //   local_op.update(local_setting);
  // },
  // setShowPicTitle({commit}, status) {
  //   commit('setShowPicTitle', status);
  //   local_setting.showPicTitle = status;
  //   local_op.update(local_setting);
  // },
  reverseShowSettingDialog({commit}) {
    commit('reverseShowSettingDialog');
  },
  setCheckboxGroup({commit}, arr) {
    commit('setCheckboxGroup', arr);
    local_setting.checkboxGroup = arr;
    local_op.update(local_setting);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
}