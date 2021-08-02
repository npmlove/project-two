import axios from 'axios'
import axiosConfig from '@/service/http-config'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// 设置全局默认值
axios.defaults.timeout = axiosConfig.timeout
axios.defaults.headers = Object.assign(axios.defaults.headers, axiosConfig.headers)
axios.defaults.baseURL = axiosConfig.baseURL
axios.defaults.retry = axiosConfig.retry
axios.defaults.retryDelay = axiosConfig.retryDelay

const checkStatus = (response) => {
  // 检查http状态码，正常直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }
  return {
    status: -404,
    msg: '网络异常'
  }
}

const checkCode = (response) => {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (response.status === -404) {
    showError(response.msg)
  }
  if (response.data.Status) {
    let resCode = response.data.Status
    if (resCode == -100) {
      // // 跳转登录
      // console.log(router.currentRoute.fullPath)
      // router.replace({
      //   path: '/login',
      //   query: {redirect: router.currentRoute.fullPath}
      // })
    }
  }
  return response
}
const showError = (errorMsg, alwaysDisplay) => {
  errorMsg = errorMsg || '服务调用出错'
  if (alwaysDisplay === true) {
    Message({
      message: errorMsg,
      type: 'warning'
    })
  } else {
    Message({
      message: errorMsg,
      type: 'warning'
    })
  }
}

const dealError = (error) => {
  showError(error.message)
}

// 请求拦截器
const requestInterceptor = (config) => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}

const requestError = (error) => {
  dealError(error)
  return Promise.reject(error)
}

// 响应拦截器
const responseInterceptor = (response) => {
  response = checkStatus(response)
  response = checkCode(response)
  return response.data
}

const responseError = (error) => {
  // console.log(error)
  if (/timeout of (\d*)ms exceeded/i.test(error.message) === true) {
    // error.message += `;url=${error.config.url}`
    timeOutErr(error)
  } else {
    dealError(error)
  }
  return Promise.resolve(error.response)
}

// 超时重发
const timeOutErr = (err) => {
  let config = err.config
  if (!config) {
    return Promise.reject(err)
  }
  config.retryCount = config.retryCount || 0
  if (config.retryCount >= config.retry) {
    err.message = `服务超时,请稍后再试`
    dealError(err)
    return Promise.reject(err)
  }
  config.retryCount += 1
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 1)
  })
  return backoff.then(function () {
    config.url = config.url.replace(axios.defaults.baseURL, '')
    return axios(config)
  })
}
/**
 * request 拦截器
 */
axios.interceptors.request.use(requestInterceptor, requestError)
/**
 * response 拦截器
 */
axios.interceptors.response.use(responseInterceptor, responseError)
const install = function (Vue, opts) {
  Vue.prototype.$http = axios
}
export default Object.assign(axios, {install})
