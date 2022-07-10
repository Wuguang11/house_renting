import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: null,
    nowCityName: '上海',
    nowId: 0
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setCityName (state, payload) {
      state.nowCityName = payload.name
      state.nowId = payload.id
    }
  },
  actions: {

  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
