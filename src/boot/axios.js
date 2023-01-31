import {boot} from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let client = null

export default boot(({app, store}) => {
  if (client) return

  // set defaults
  let timeout = parseInt(process.env.AXIOS_TIMEOUT)
  if (process.env.NODE_ENV === 'production' && (isNaN(timeout) || timeout < 2000)) {
    timeout = 2000
  } else {
    timeout = 0
  }

  const axiosConfig = {
    baseURL: store.getters['common/api_base_url'],
    timeout,
    timeoutErrorMessage: '连接超时, 请检查设置'
  }
  client = axios.create(axiosConfig)

  const token = store.getters['user/token']
  // 添加自定义 headers
  if (token) client.defaults.headers['authorization'] = ['Token', token].join(' ')

  // Add a response interceptor
  // 使用响应拦截器，统一处理响应
  client.interceptors.response.use(function (response) {
    const _ = response.data
    // 正常响应中的 errors 字段是自定义错误字段，需要额外处理
    // 在这里丢出的错误会被 axios catch，所以无需修改业务端的逻辑
    return _.errors ? Promise.reject(new Error(_.errors)) : _
  }, function (error) {
    return Promise.reject(error)
  })

  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = client
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$rawAxios = axios
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

// export { api }
