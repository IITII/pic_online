import Vue from 'vue'
import axios from 'axios'
import store from '../store'

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

for (const k in axiosConfig) {
  axios.defaults[k] = axiosConfig[k]
}

const token = store.getters['user/token']
// 添加自定义 headers
if (token) axios.defaults.headers['authorization'] = ['Token', token].join(' ')

// Add a response interceptor
// 使用响应拦截器，统一处理响应
axios.interceptors.response.use(function (response) {
  const _ = response.data
  // 正常响应中的 errors 字段是自定义错误字段，需要额外处理
  // 在这里丢出的错误会被 axios catch，所以无需修改业务端的逻辑
  return _.errors ? Promise.reject(new Error(_.errors)) : _
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
