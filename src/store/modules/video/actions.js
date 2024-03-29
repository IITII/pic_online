import persistent from 'src/utils/persistent'
// actions
export const drawer_open = ({commit}, payload) => {
  persistent.videoSet('drawer_open', payload)
  commit('drawer_open', payload)
}
export const skip_empty_dir = ({commit}, payload) => {
  persistent.videoSet('skip_empty_dir', payload)
  commit('skip_empty_dir', payload)
}
export const expand_depth = ({commit}, payload) => {
  persistent.videoSet('expand_depth', payload)
  commit('expand_depth', payload)
}
export const title = ({commit}, payload) => {
  persistent.videoSet('title', payload)
  commit('title', payload)
}
export const node_key = ({commit}, payload) => {
  persistent.videoSet('node_key', payload)
  commit('node_key', payload)
}
export const show_img_title = ({commit}, payload) => {
  persistent.videoSet('show_img_title', payload)
  commit('show_img_title', payload)
}
export const waterfall_col = ({commit}, payload) => {
  persistent.videoSet('waterfall_col', payload)
  commit('waterfall_col', payload)
}
export const waterfall_stride = ({commit}, payload) => {
  persistent.videoSet('waterfall_stride', payload)
  commit('waterfall_stride', payload)
}
export const title_max_length = ({commit}, payload) => {
  persistent.videoSet('title_max_length', payload)
  commit('title_max_length', payload)
}
export const auto_next = ({commit}, payload) => {
  persistent.videoSet('auto_next', payload)
  commit('auto_next', payload)
}
export const node_dir = ({commit}, payload) => {
  persistent.videoSet('node_dir', payload)
  commit('node_dir', payload)
}
export const drawer_width = ({commit}, payload) => {
  persistent.videoSet('drawer_width', payload)
  commit('drawer_width', payload)
}

