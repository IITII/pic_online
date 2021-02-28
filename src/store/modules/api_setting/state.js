import dataPersistent from 'src/utils/persistent'

const apiPort = 3000
const apiBasic = `${window.location.protocol}//${window.location.hostname}:${apiPort}`
const apiPrefix = {
  treeUrl: '/private/tree',
  picUrl: '/private/pic'
}

const state = {
  // tree api 地址
  treeUrl: dataPersistent.apiGetItem('treeUrl') ||
    process.env.VUE_APP_TREE_API_URL || `${apiBasic}${apiPrefix.treeUrl}`,
  // tree api 请求方法
  treeMethod: dataPersistent.apiGetItem('treeMethod') || 'GET',
  // pic api 地址
  picUrl: dataPersistent.apiGetItem('picUrl') ||
    process.env.VUE_APP_PIC_API_URL || `${apiBasic}${apiPrefix.picUrl}`,
  // pic api 请求方法
  picMethod: dataPersistent.apiGetItem('picMethod') || 'POST'
}

export default function () {
  return state
}
