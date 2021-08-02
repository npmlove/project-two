import {
  constantRouterMap
} from '@/router'

/**
 * @param permission
 * @param page
 */
function hasPermission(permission, page) {
  if (permission.length > 0) {
    return permission.some(route => {
      const pageUrl = route.pageUrl
      const path = page.path
      return pageUrl.indexOf(path) > -1
    })
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param RouterMap
 * @param pages
 */
function filterAsyncRouter(RouterMap, pages) {
  const accessedRoutes = RouterMap.filter(route => {
    if (hasPermission(pages, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, pages)
      }
      return true
    }
    return false
  })
  return accessedRoutes
}

const permission = {
  state: {
    routers: constantRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const pages = data.data
        const accessedRouters = filterAsyncRouter(constantRouterMap, pages)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
