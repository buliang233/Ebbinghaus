import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import './assets/styles/normalize.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

//把echarts加入到vue实例中
Vue.prototype.$echarts = echarts

//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//粒子背景
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine)

Vue.config.productionTip = false

//判断登录态
const user = localStorage.getItem('user')
if(user == null){
	location.href = '/login.html'
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
