import dataPersistent from 'src/utils/persistent'

const state = {
  // tree api 地址
  treeUrl: dataPersistent.apiGetItem('treeUrl') ||
    process.env.VUE_APP_TREE_API_URL || '',
  // tree api 请求方法
  treeMethod: dataPersistent.apiGetItem('treeMethod') || 'GET',
  // pic api 地址
  picUrl: dataPersistent.apiGetItem('picUrl') ||
    process.env.VUE_APP_PIC_API_URL || '',
  // pic api 请求方法
  picMethod: dataPersistent.apiGetItem('picMethod') || 'POST'
}

export default function () {
  return state
}
