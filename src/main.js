import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



import { Message} from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.prototype.$Message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  Message,
  render: h => h(App)
}).$mount('#app')
