import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexType: 'myChart', // index.vue的显示组件
    dialogArr: [ // 对话内容数组
      {
        type: "left",
        message: "你好呀~(๑´∀`๑)"
      },
    ]
  },
  mutations: {
    switchIndx(state, newVl) {
      state.indexType = newVl
    },
    addDiaLog (state, dialog) {
      state.dialogArr.push(dialog)
    }
  },
  actions: {
  },
  modules: {
  }
})
