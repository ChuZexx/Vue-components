import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Form, Carousel, Tree } from './components'

Vue.use(Form)
Vue.use(Carousel)
Vue.use(Tree)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
