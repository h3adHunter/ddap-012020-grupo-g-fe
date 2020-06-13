import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/index'
import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons, NavbarPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import i18n from './i18n'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(NavbarPlugin)
Vue.use(VeeValidate)
Validator.localize('es', es)

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_API_URL)
console.log(process.env.API_URL)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
