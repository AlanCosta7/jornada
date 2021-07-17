import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import appStore from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: appStore.state,
  getters: appStore.getters,
  mutations: {
    ...vuexfireMutations,
    ...appStore.mutations
  },
  actions: appStore.actions
})
