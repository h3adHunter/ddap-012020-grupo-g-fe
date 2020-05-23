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

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(NavbarPlugin)
Vue.use(VeeValidate)
Validator.localize('es', es)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
