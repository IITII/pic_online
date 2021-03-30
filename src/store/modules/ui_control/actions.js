import persistent from 'src/utils/persistent'

export function setWaterfallCol ({ commit }, waterfallCol) {
  commit('setWaterfallCol', waterfallCol)
  persistent.uiSetItem('waterfallCol', waterfallCol)
}

export function setWaterfallStride ({ commit }, waterfallStride) {
  commit('setWaterfallStride', waterfallStride)
  persistent.uiSetItem('waterfallStride', waterfallStride)
}

export function setNodeKey ({ commit }, nodeKey) {
  commit('setNodeKey', nodeKey)
  persistent.uiSetItem('nodeKey', nodeKey)
}

export function setShowSettingDialog ({ commit }, show) {
  commit('setShowSettingDialog', show)
  persistent.uiSetItem('showSettingDialog', show)
}

export function setViewerPlayInterval ({ commit }, interval) {
  commit('setViewerPlayInterval', interval)
  persistent.uiSetItem('viewerPlayInterval', interval)
}

export function setShowImgTitle ({ commit }, showImgTitle) {
  commit('setShowImgTitle', showImgTitle)
  persistent.uiSetItem('showImgTitle', showImgTitle)
}

export function reverseLeftDrawerOpen ({ commit }) {
  commit('reverseLeftDrawerOpen')
  const key = 'leftDrawerOpen'
  persistent.uiSetItem(key, persistent.uiGetItem(key) !== 'true')
}

export function setSkipEmptyDir ({ commit }, skip) {
  commit('setSkipEmptyDir', skip)
  persistent.uiSetItem('skipEmptyDir', skip)
}

export function setSelectedNodeTitle ({ commit }, selectedNodeTitle) {
  commit('setSelectedNodeTitle', selectedNodeTitle)
  persistent.uiSetItem('selectedNodeTitle', selectedNodeTitle)
}

export function setImgTitleMaxLength ({ commit }, length) {
  commit('setImgTitleMaxLength', length)
  persistent.uiSetItem('imgTitleMaxLength', length)
}

export function setLanguage ({ commit }, lang) {
  commit('setLanguage', lang)
  persistent.uiSetItem('language', lang)
}
