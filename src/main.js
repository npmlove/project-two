import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from '@/util/http'
import serviceAPI from '@/service/index'

import { Input } from 'element-ui'
import '@/style/icon/iconfont.css'
import '@/style/reset.css'
import '@/style/common.css'

Vue.config.productionTip = false
Vue.prototype.$service = serviceAPI

//判断是否登录
router.beforeEach(function (to, from, next) {
  if (to.meta.needLogin) {
    //从cookie中获取用户信息，判断是否已登录
    var UserID = !sessionStorage.getItem('userInfo') ? '' : JSON.parse(sessionStorage.getItem('userInfo')).UserID
    // console.log(UserID)
    if (UserID) {
      next(); //表示已经登录
    } else {
      //未登录
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      router.replace({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }

  }else{
    next(); //表示已经登录
  }
});

Vue.use(http)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
