
import serviceApi from '@/service/index'
import http from '@/util/http'

const user = {
  state: {
    name: '',
    UserID: '',
    token: '',
    userInfo: ''
  },

  getters: {
    getToken (state) {
      const cache = sessionStorage.getItem('token')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.token) {
        return state.token
      } else {
        return cacheData
      }
    },
    getName (state) {
      const cache = sessionStorage.getItem('name')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.name) {
        return state.name
      } else {
        return cacheData
      }
    },
    getUserID (state) {
      const cache = sessionStorage.getItem('UserID')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.UserID) {
        return state.UserID
      } else {
        return cacheData
      }
    },
    getUserInfo (state) {
      const cache = sessionStorage.getItem('userInfo')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.userInfo) {
        return state.userInfo
      } else {
        return cacheData
      }
    }
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
      sessionStorage.setItem('token', data ? JSON.stringify(data) : '')
    },
    SET_UserID: (state, data) => {
      state.UserID = data
      sessionStorage.setItem('UserID', data ? JSON.stringify(data) : '')
    },
    SET_NAME: (state, data) => {
      state.name = data
      sessionStorage.setItem('name', data ? JSON.stringify(data) : '')
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
      sessionStorage.setItem('userInfo', data ? JSON.stringify(data) : '')
    },
    SET_MENU: (state, data) => {
      state.menu = data
      sessionStorage.setItem('menu', data ? JSON.stringify(data) : '')
    },
    SET_EfreshTOKEN: (state, data) => {
    	state.refreshToken = data
      sessionStorage.setItem('refreshToken', data ? JSON.stringify(data) : '')
    }
  }
}

export default user
