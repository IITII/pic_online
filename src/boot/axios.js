import Vue from 'vue'
import axios from 'axios'

const axiosConfig = {
  timeout: 2000,
  timeoutErrorMessage: '连接超时, 请检查设置'
}

// init axios
axios.defaults.timeout = axiosConfig.timeout
axios.defaults.timeoutErrorMessage = axiosConfig.timeoutErrorMessage

Vue.prototype.$axios = axios
