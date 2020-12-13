import persistent from 'src/utils/persistent'

export function setTreeUrl ({ commit }, url) {
  commit('setTreeUrl', url)
  persistent.apiSetItem('treeUrl', url)
}

export function setTreeMethod ({ commit }, method) {
  commit('setTreeMethod', method)
  persistent.apiSetItem('treeMethod', method)
}

export function setPicUrl ({ commit }, url) {
  commit('setPicUrl', url)
  persistent.apiSetItem('picUrl', url)
}

export function setPicMethod ({ commit }, method) {
  commit('setPicMethod', method)
  persistent.apiSetItem('picMethod', method)
}
