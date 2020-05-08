import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import es from 'vee-validate/dist/locale/es'
// import VeeValidate, { Validator } from "vee-validate";
import vuetify from './plugins/vuetify'
//prettier-ignore
import { BootstrapVue, IconsPlugin, BootstrapVueIcons, NavbarPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(NavbarPlugin)
// Vue.use(VeeValidate);
// Validator.localize("es", es);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
