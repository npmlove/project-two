import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import financial from './modules/financial'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    financial
  }
})

export default store