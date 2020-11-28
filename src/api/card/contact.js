// 通讯录API
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const contactApi = {
  getCardHolderList(page, relaStatus) {
    let url = `${API_MODULE}/mini/contact/cardHolderList?page=${page}&relaStatus=${relaStatus}`
    return httpRequest.get({
      'url': url
    })
  },
  getReceiverStaff(id) {
    let url = `${API_MODULE}/mini/contact/receiver/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  getCardList(staffId, openId) {
    let url = `${API_MODULE}/mini/contact/cardList/${staffId}/${openId}`
    return httpRequest.get({
      'url': url
    })
  },
  getStaffList(staffId, openId, page) {
    let url = `${API_MODULE}/mini/contact/staffList/${staffId}/${openId}?page=${page}`
    return httpRequest.get({
      'url': url
    })
  },
  getStaffId(openId) {
    let url = `${API_MODULE}/mini/contact/getStaffId/${openId}`
    return httpRequest.get({
      'url': url
    })
  },
  setPosition(relaId1, relaId2) {
    let url = `${API_MODULE}/mini/contact/setPosition/${relaId1}/${relaId2}`
    return httpRequest.get({
      'url': url
    })
  },
  delPosition(relaId) {
    let url = `${API_MODULE}/mini/contact/delPosition/${relaId}`
    return httpRequest.get({
      'url': url
    })
  },
  cardOn(relaId) {
    let url = `${API_MODULE}/mini/card/on/${relaId}`
    return httpRequest.get({
      'url': url
    })
  },
  cardOff(relaId) {
    let url = `${API_MODULE}/mini/card/off/${relaId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取微信用户信息
  getMyselfInfo(openId) {
    let url = `${API_MODULE}/mini/card/getMyselfInfo/${openId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取我的名片夹列表
  getMyselfList(openId) {
    let url = `${API_MODULE}/mini/card/getMyselfList/${openId}`
    return httpRequest.get({
      'url': url
    })
  }
}
export default contactApi
