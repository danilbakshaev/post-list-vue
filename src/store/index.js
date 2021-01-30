import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    next: ''
  },
  mutations: {
    rewriteData(state, val) {
      state.data = val.results
      state.next = !val.error ? val.info.next : 'error'
    },
    addData(state, val) {
      state.data = state.data.concat(val.results)
      state.next = !val.error ? val.info.next : 'error'
    }
  },
  actions: {
    async getFirstData(ctx, param = '') {
      await fetch(`https://rickandmortyapi.com/api/character/${param}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        ctx.commit('rewriteData', data)
      });
    },
    async getNextPage(ctx, param = '') {
      await fetch(`${param}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        ctx.commit('addData', data)
      });
    }
  }
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  