(function () {
  const DcUtils = {
    loadScript({ name, val, src }) {
      // 如果已存在，不再重新加载
      const existedScript = document.querySelector(`#${name}`)
      if (existedScript) {
        return
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = name
      script.onload = () => {
        console.log(`${name} is loaded, use ${val}`)
      }
      script.src = src
      document.head.appendChild(script)
    },
    loadScripts() {
      const scripts = [
        {
          name: 'qs',
          val: 'Qs',
          src: './js/qs.min.js',
        },
      ]
      scripts.forEach(item => DcUtils.loadScript(item))
    },
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
    beforeLeavePage() {
      window.onbeforeunload = (ev) => {
        ev = ev || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (ev) {
          ev.returnValue = '关闭提示'
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示'
      }
    },
  }
  DcUtils.loadScripts()
  window.DcUtils = DcUtils
})()