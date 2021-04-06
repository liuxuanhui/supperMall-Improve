import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js' 
import actions from './actions.js'
//这是vue官方推荐的写法   mutations等代码放在一起的时候不好维护 故分开写
Vue.use(Vuex)

const state = {
  cartList:[]
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})
