// 明信片接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const loginApi = {
  getOpenid(params) {
    let url = `${API_MODULE}/mini/getopenid`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  login(params) {
    let url = `${API_MODULE}/mini/login`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 获取webIM登录信息
  getChatLoginInfo(params) {
    let url = `${API_MODULE}/mini/findUserInfo`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 注册webIM登录信息
  saveChatUserInfo(params) {
    let url = `${API_MODULE}/mini/addUserInfo`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 获取小程序用户的用户信息
  getStaffInfoFromBack(openid) {
    let url = `${API_MODULE}/mini/card/getStaffInfo/${openid}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取openid并且验证是否首次获取使用小程序
  getOpenidAndCheck(params) {
    let url = `${API_MODULE}/mini/getOpenidAndCheck`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 获取openid并且验证是否首次获取使用小程序
  createRela(params) {
    let url = `${API_MODULE}/mini/card/userLogin`
    return httpRequest.post({
      'url': url,
      params: params
    })
  }
}

export default loginApi
