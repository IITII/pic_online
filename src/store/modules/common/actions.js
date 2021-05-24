import persistent from 'src/utils/persistent'

export const title = ({commit}, payload) => {
  persistent.commonSet('title', payload, sessionStorage)
  commit('title', payload)
}
export const description = ({commit}, payload) => {
  persistent.commonSet('description', payload, sessionStorage)
  commit('description', payload)
}
export const background = ({commit}, payload) => {
  persistent.commonSet('background', payload, sessionStorage)
  commit('background', payload)
}
