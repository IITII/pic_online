import persistent from 'src/utils/persistent'

export const title = ({commit}, payload) => {
  persistent.commonSet('title', payload)
  commit('title', payload)
}

export const api_base_url = ({commit}, payload) => {
  persistent.commonSet('api_base_url', payload)
  commit('api_base_url', payload)
}
export const description = ({commit}, payload) => {
  persistent.commonSet('description', payload)
  commit('description', payload)
}

export const background = ({commit}, payload) => {
  persistent.commonSet('background', payload)
  commit('background', payload)
}

export const tool_group_force_right = ({commit}, payload) => {
  persistent.commonSet('tool_group_force_right', payload)
  commit('tool_group_force_right', payload)
}
export const image_shortcut = ({commit}, payload) => {
  persistent.commonSet('image_shortcut', payload)
  commit('image_shortcut', payload)
}
export const reload_timeout = ({commit}, payload) => {
  persistent.commonSet('reload_timeout', payload)
  commit('reload_timeout', payload)
}
export const delete_confirm = ({commit}, payload) => {
  persistent.commonSet('delete_confirm', payload)
  commit('delete_confirm', payload)
}
export const recursive_delete = ({commit}, payload) => {
  persistent.commonSet('recursive_delete', payload)
  commit('recursive_delete', payload)
}
