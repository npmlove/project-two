
const financial = {
  state: {
    payExceptNum: ''
  },

  getters: {
    getPayExceptNum (state) {
      const cache = sessionStorage.getItem('payExceptNum')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.payExceptNum) {
        return state.payExceptNum
      } else {
        return cacheData
      }
    }
  },

  mutations: {
    SET_PAY_EXCEPNUM: (state, data) => {
      state.payExceptNum = data
      sessionStorage.setItem('payExceptNum', data ? JSON.stringify(data) : '')
    }
  },

  actions: {
  }
}

export default financial
