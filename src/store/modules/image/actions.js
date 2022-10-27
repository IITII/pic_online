import persistent from 'src/utils/persistent'
// actions
export const drawer_open = ({commit}, payload) => {
  persistent.imageSet('drawer_open', payload)
  commit('drawer_open', payload)
}
export const skip_empty_dir = ({commit}, payload) => {
  persistent.imageSet('skip_empty_dir', payload)
  commit('skip_empty_dir', payload)
}
export const expand_depth = ({commit}, payload) => {
  persistent.imageSet('expand_depth', payload)
  commit('expand_depth', payload)
}
export const title = ({commit}, payload) => {
  persistent.imageSet('title', payload)
  commit('title', payload)
}
export const node_key = ({commit}, payload) => {
  persistent.imageSet('node_key', payload)
  commit('node_key', payload)
}
export const show_img_title = ({commit}, payload) => {
  persistent.imageSet('show_img_title', payload)
  commit('show_img_title', payload)
}
export const waterfall_col = ({commit}, payload) => {
  persistent.imageSet('waterfall_col', payload)
  commit('waterfall_col', payload)
}
export const waterfall_stride = ({commit}, payload) => {
  persistent.imageSet('waterfall_stride', payload)
  commit('waterfall_stride', payload)
}
export const title_max_length = ({commit}, payload) => {
  persistent.imageSet('title_max_length', payload)
  commit('title_max_length', payload)
}
export const viewer_play_interval = ({commit}, payload) => {
  persistent.imageSet('viewer_play_interval', payload)
  commit('viewer_play_interval', payload)
}
export const auto_next = ({commit}, payload) => {
  persistent.imageSet('auto_next', payload)
  commit('auto_next', payload)
}

