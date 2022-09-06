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
