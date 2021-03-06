import persistent from 'src/utils/persistent'

const state = {
  // 瀑布流最多显示行数
  waterfallCol: parseInt(persistent.uiGetItem('waterfallCol')) || 5,
  // 每次加载手动加载数量
  waterfallStride: parseInt(persistent.uiGetItem('waterfallStride')) || 10,
  // nodeKey 的值
  nodeKey: parseInt(persistent.uiGetItem('nodeKey')) || 1,
  // 是否显示设置界面
  // deprecated
  showSettingDialog: persistent.uiGetItem('showSettingDialog') === 'true',
  // v-viewer play interval (Unit: ms)
  // The amount of time to delay between automatically cycling an image when playing.
  viewerPlayInterval: persistent.uiGetItem('viewerPlayInterval') || 2000,
  // 是否显示图片标题
  showImgTitle: persistent.uiGetItem('showImgTitle') === 'true',
  // 默认最长图片标题长度
  imgTitleMaxLength: parseInt(persistent.uiGetItem('imgTitleMaxLength')) || 12,
  // 显示侧栏
  leftDrawerOpen: persistent.uiGetItem('leftDrawerOpen') === 'true',
  // 跳过空白文件夹
  skipEmptyDir: persistent.uiGetItem('skipEmptyDir') !== 'false',
  // 导航栏标题
  selectedNodeTitle: persistent.uiGetItem('selectedNodeTitle') || 'pic_online',
  // 默认自动展开节点深度
  // 默认语言
  language: persistent.uiGetItem('language')
}

export default function () {
  return state
}
