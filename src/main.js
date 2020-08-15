import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 按需引入iview
import { Message, Switch } from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.prototype.$Message = Message;
Vue.component('i-switch', Switch);

// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

// 服务器请求地址，挂载为全局变量
Vue.prototype.$httpUrl =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_URL
    : '/localHttp';

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  Message,
  render: h => h(App)
}).$mount('#app')

