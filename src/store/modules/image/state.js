import persistent from 'src/utils/persistent'

const state = {
  // 抽屉属性
  // 显示侧栏
  drawer_open: persistent.imageGet('drawer_open') === 'true',
  // 跳过空白文件夹
  skip_empty_dir: persistent.imageGet('skip_empty_dir') !== 'false',
  // 默认自动展开节点深度
  expand_depth: parseInt(persistent.imageGet('node_key')) || 3,

  // 通用属性
  // 导航栏标题
  title: persistent.imageGet('title') || 'Pic Online',
  // nodeKey 的值
  node_key: parseInt(persistent.imageGet('node_key')) || 1,

  // 瀑布流属性
  // 是否显示图片标题
  show_img_title: persistent.imageGet('show_img_title') === 'true',
  // 瀑布流最多显示行数
  waterfall_col: parseInt(persistent.imageGet('waterfall_col')) || 5,
  // 每次加载手动加载数量
  waterfall_stride: parseInt(persistent.imageGet('waterfall_stride')) || 10,
  // 默认最长标题长度
  title_max_length: parseInt(persistent.imageGet('title_max_length')) || 24,
  // v-viewer play interval (Unit: ms)
  // The amount of time to delay between automatically cycling an image when playing.
  viewer_play_interval: persistent.imageGet('viewer_play_interval') || 2000,
  auto_next: persistent.imageGet('auto_next') !== 'false',
}

export default function () {
  return state
}
