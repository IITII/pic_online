import persistent from 'src/utils/persistent'

export const title = ({commit}, payload) => {
  persistent.commonSet('title', payload, sessionStorage)
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
