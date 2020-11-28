import wepy from 'wepy'
import {urlOfGetApi, apiRoot, apiCapitalVersion1, isLocalServer} from '@/config'
import siteInfo from '@/siteinfo'

/**
 * 获取api地址
 */
export const getUrl = function() {
  return wepy.$instance.globalData.api.apiUrl
}

/**
 * 请求小程序对应的api域名
 * @param  {[type]} getApiURL 集群路由的地址(For 本地调试模式或服务器调试模式)
 * @param  {[type]} uniacid 微擎对应的id
 */
export const requestApiUrl = function(apiRouterURL, uniacid) {
  let url = `${apiRouterURL}/${apiRoot}/${apiCapitalVersion1}/common/api_url/${uniacid}`
  return wepy.request({
    url: url,
    data: '',
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  }).then((data) => {
    let promise = new Promise((resolve, reject) => {
      if (data.statusCode === 200) {
        resolve(data.data)
      } else {
        reject(data)
      }
    })
    return promise
  })
}

/**
 * 保存api地址
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export const saveApiUrl = function(url) {
  wepy.$instance.globalData.api.apiUrl = url
}

/**
 * 获取当前小程序对应的api地址
 */
export const getBase = function() {
  let apiAdress = getUrl()
  let promise = new Promise((resolve, reject) => {
    if (!apiAdress) {
      // 服务器获取
      var apiRouterURL = urlOfGetApi
      return requestApiUrl(apiRouterURL, siteInfo.uniacid).then(res => {
        // 保存
        if (isLocalServer === true) {
          // 本机服务器调试模式, 路由到127.0.0.1
          saveApiUrl(apiRouterURL)
          resolve(apiRouterURL)
        } else {
          saveApiUrl(res)
          resolve(res)
        }
      }, () => {
        // M by PLH at 2018-09-27 FOR 微擎不可用的状态的调试代码, 微擎OK后，注释下面的代码，再放开下面的错误提示代码 Begin
        // saveApiUrl('http://127.0.0.1')
        // resolve('http://127.0.0.1')
        wepy.showModal({
          title: '提示',
          content: '初始化失败',
          showCancel: false
        })
        // M by PLH at 2018-09-27 FOR 微擎不可用的状态的调试代码, 微擎OK后，注释下面的代码，再放开下面的错误提示代码 End
      })
    } else {
      resolve(apiAdress)
    }
  })
  return promise
}
