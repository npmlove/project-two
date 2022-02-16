(function () {
  const DcUtils = {
    // token过期，清空本地存储里的用户信息，然后跳转login页面
    tokenExpired() {
      const removeExpiredItems = [
        'userInfo',
        'wxOpenId',
        'dcUuid',
        'tokenId',
      ]
      removeExpiredItems.forEach(item => {
        localStorage.removeItem(item)
      })
      const redirect = encodeURIComponent(location.href)
      window.location.href = `./login.html?redirect=${redirect}`
    },
    // 登录后的跳转，判断是否有redirect字段
    redirectLogin() {
      const searchObj = Qs.parse(location.search.slice(1))
      // 有 redirect 就跳转 redirect
      if (searchObj.redirect) {
        window.location.href = decodeURIComponent(searchObj.redirect)
      } else {
        window.location.href = './index.html'
      }
    },
    // 离开页面前的操作
    beforeLeavePage(callback) {
      window.onbeforeunload = (ev) => {
        callback && callback()
        // ev = ev || window.event;
        // // 兼容IE8和Firefox 4之前的版本
        // if (ev) {
        //   ev.returnValue = '关闭提示'
        // }
        // // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        // return '关闭提示'
      }
    },
    // 设置sessionStorage
    setSessionStorage(key, val) {
      if (!key || !val) {
        return
      } else {
        sessionStorage.setItem(key, JSON.stringify(val))
      }
    },
    // 设置sessionStorage
    getSessionStorage(key) {
      if (!key) {
        return
      } else {
        const val = sessionStorage.getItem(key)
        return JSON.parse(val)
      }
    },
  }
  window.DcUtils = DcUtils
})()