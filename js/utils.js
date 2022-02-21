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
    // 获取认证主体
    async getLocalCertificationBody() {
      const wxOpenId = localStorage.getItem('wxOpenId')
      const tokenId = localStorage.getItem('tokenId')
      if (!wxOpenId || !tokenId) {
        DcUtils.tokenExpired()
        return
      }
      try {
        const { data } = await axios({
          method: 'get',
          url: webIp + serviceApi.userUserInfo + '?openId=' + wxOpenId,
          headers: {
            'tokenId': localStorage.getItem('tokenId')
          }
        })
        switch (data.code) {
          case 200:
            localStorage.setItem('userInfo', JSON.stringify(data.data.tportalUser))
            localStorage.setItem('wxOpenId', data.data.tportalUser.wechatOpenId)
            localStorage.setItem('tokenId', data.data.tokenId)
            localStorage.setItem('certificationBody', data.data.tportalUser.certificationBody)
            break;
          case -200:
            DcUtils.tokenExpired()
            break;
          default:
            ELEMENT.Message.error(data.message)
            break;
        }
      } catch (error) {
        ELEMENT.Message.error(error.message)
      }
      return
    }
  }
  window.DcUtils = DcUtils
})()