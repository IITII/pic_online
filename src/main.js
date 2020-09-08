import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueLogger from 'vuejs-logger';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
