import Vue from 'vue'
import Vuex from 'vuex'

import { account } from './account.module';
import { alert } from './alert.module';
import { cart } from './cart.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
      account,
      alert,
      cart
  }
})
