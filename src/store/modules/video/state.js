import persistent from 'src/utils/persistent'

const state = {
  // 抽屉属性
  // 显示侧栏
  drawer_open: persistent.videoGet('drawer_open') === 'true',
  // 跳过空白文件夹
  skip_empty_dir: persistent.videoGet('skip_empty_dir') !== 'false',
  // 默认自动展开节点深度
  expand_depth: parseInt(persistent.videoGet('node_key')) || 3,

  // 通用属性
  // 导航栏标题
  title: persistent.videoGet('title') || 'Pic Online',
  // nodeKey 的值
  node_key: parseInt(persistent.videoGet('node_key')) || 1,
  node_dir: persistent.videoGet('node_dir'),

  // 瀑布流属性
  // 是否显示图片标题
  show_img_title: persistent.videoGet('show_img_title') === 'true',
  // 瀑布流最多显示行数
  waterfall_col: parseInt(persistent.videoGet('waterfall_col')) || 5,
  // 每次加载手动加载数量
  waterfall_stride: parseInt(persistent.videoGet('waterfall_stride')) || 10,
  // 默认最长标题长度
  title_max_length: parseInt(persistent.videoGet('title_max_length')) || 120,
  auto_next: persistent.videoGet('auto_next') === 'true',
  // 默认最长标题长度
  drawer_width: parseInt(persistent.imageGet('drawer_width')) || 300,
}

export default function () {
  return state
}
