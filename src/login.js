import Vue from 'vue'
import Login from './Login.vue'
import router from './router'
import './assets/styles/normalize.css'

//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//粒子背景
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Login)
}).$mount('#app')
