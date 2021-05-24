import persistent from 'src/utils/persistent'

export const name = ({commit}, payload) => {
  persistent.userSet('name', payload)
  commit('name', payload)
}
export const language = ({commit}, payload) => {
  persistent.userSet('language', payload)
  commit('language', payload)
}
export const user_type = ({commit}, payload) => {
  persistent.userSet('user_type', payload, sessionStorage)
  commit('user_type', payload)
}
export const token = ({commit}, payload) => {
  persistent.userSet('token', payload)
  commit('token', payload)
}
export const user = ({commit}, payload) => {
  // actions
  name({commit}, payload.name)
  language({commit}, payload.language)
  user_type({commit}, payload.user_type)
  token({commit}, payload.token)
}

export const logout = () => {
  // remove
  const localItems = ['name', 'language', 'user_type', 'token']
  localItems.forEach(i => persistent.userRemove(i))
  const sessionItems = ['user_type']
  sessionItems.forEach(i => persistent.userRemove(i, sessionStorage))
  window.location.reload()
}
