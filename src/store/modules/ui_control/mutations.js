export function setWaterfallCol (state, waterfallCol) {
  state.waterfallCol = waterfallCol
}

export function setWaterfallStride (state, waterfallStride) {
  state.waterfallStride = waterfallStride
}

export function setNodeKey (state, nodeKey) {
  state.nodeKey = nodeKey
}

export function setShowSettingDialog (state, show) {
  state.showSettingDialog = show
}

export function setShowImgTitle (state, showImgTitle) {
  state.showImgTitle = showImgTitle
}

export function reverseLeftDrawerOpen (state) {
  state.leftDrawerOpen = !state.leftDrawerOpen
}

export function setSelectedNodeTitle (state, selectedNodeTitle) {
  state.selectedNodeTitle = selectedNodeTitle
}

export function setImgTitleMaxLength (state, length) {
  state.imgTitleMaxLength = length
}

export function setLanguage (state, lang) {
  state.language = lang
}
