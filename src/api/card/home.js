// 明信片接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const homeApi = {
  // 收藏名片
  collectCard(relaId) {
    let url = `${API_MODULE}/mini/contact/collectCard/${relaId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 取消收藏
  deleteCollectCard(relaId) {
    let url = `${API_MODULE}/mini/contact/deleteCollectCard/${relaId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取收藏的名片列表
  getCollectCardList(params) {
    let url = `${API_MODULE}/mini/contact/getCollectCardList?page=${params}`
    return httpRequest.get({
      'url': url
    })
  },
  // 搜索历史名片列表
  searchCardList(params) {
    let url = `${API_MODULE}/mini/contact`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 看过我名片的人的名片列表
  viewMyCardList() {
    let url = `${API_MODULE}/mini/contact/getSeeMyselfCardList`
    return httpRequest.get({
      'url': url
    })
  },
  // 发现名片
  findCardList(openId, params) {
    let url = `${API_MODULE}/mini/getRecommendListToMainPage?open_id=${openId}`
    return httpRequest.post({
      'url': url,
      params: params
    })
  }
}

export default homeApi
