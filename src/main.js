import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/normalize.css'

//粒子背景
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
