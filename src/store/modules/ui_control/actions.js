import persistent from 'src/utils/persistent'

export function setWaterfallCol({commit}, waterfallCol) {
  commit('setWaterfallCol', waterfallCol)
  persistent.uiSet('waterfallCol', waterfallCol)
}

export function setWaterfallStride({commit}, waterfallStride) {
  commit('setWaterfallStride', waterfallStride)
  persistent.uiSet('waterfallStride', waterfallStride)
}

export function setNodeKey({commit}, nodeKey) {
  commit('setNodeKey', nodeKey)
  persistent.uiSet('nodeKey', nodeKey)
}

export function setShowSettingDialog({commit}, show) {
  commit('setShowSettingDialog', show)
  persistent.uiSet('showSettingDialog', show)
}

export function setViewerPlayInterval({commit}, interval) {
  commit('setViewerPlayInterval', interval)
  persistent.uiSet('viewerPlayInterval', interval)
}

export function setShowImgTitle({commit}, showImgTitle) {
  commit('setShowImgTitle', showImgTitle)
  persistent.uiSet('showImgTitle', showImgTitle)
}

export function reverseLeftDrawerOpen({commit}) {
  commit('reverseLeftDrawerOpen')
  const key = 'leftDrawerOpen'
  persistent.uiSet(key, persistent.uiGet(key) !== 'true')
}

export function setSkipEmptyDir({commit}, skip) {
  commit('setSkipEmptyDir', skip)
  persistent.uiSet('skipEmptyDir', skip)
}

export function setSelectedNodeTitle({commit}, selectedNodeTitle) {
  commit('setSelectedNodeTitle', selectedNodeTitle)
  persistent.uiSet('selectedNodeTitle', selectedNodeTitle)
}

export function setImgTitleMaxLength({commit}, length) {
  commit('setImgTitleMaxLength', length)
  persistent.uiSet('imgTitleMaxLength', length)
}

export function setLanguage({commit}, lang) {
  commit('setLanguage', lang)
  persistent.uiSet('language', lang)
}
