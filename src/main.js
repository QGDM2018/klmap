import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'

// 按需引入 echarts
var echarts = require('echarts/lib/echarts');
// 引入图
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/component/polar");
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// 引入画点画图
require("echarts/lib/component/markPoint");
require("echarts/lib/component/markLine");
Vue.prototype.$echarts = echarts;


// 按需引入iview
import { Spin, Modal, Message, Switch } from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.prototype.$Spin = Spin;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Message.config({
  top: 150,
});
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
  // router,
  store,
  Message,
  render: h => h(App)
}).$mount('#app')

