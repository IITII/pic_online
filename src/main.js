import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueLogger from 'vuejs-logger';
//Vue Router 路由管理
import router from '@/routes/routes'
// Vuex Vue store
import store from '@/stores';
// for draggable component
// import VueDragResize from 'vue-drag-resize';

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

// Vue.component('vue-drag-resize', VueDragResize);
Vue.use(VueLogger, options);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
