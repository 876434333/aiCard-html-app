// 明信片接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion,
  apiVersion3
} from '@/config'
const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`
const API_MODULE3 = `${apiAdress}/${apiRoot}/${apiVersion3}`
const cardManagerApi = {
  // 创建名片(企业)
  addCard(params) {
    let url = `${API_MODULE}/mini/card/addcard`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  getVideo(params) {
    let url = `${API_MODULE}/mini/video/get`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  addVideo(params) {
    let url = `${API_MODULE}/mini/video/add`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  updCardStyle(params) {
    let url = `${API_MODULE}/mini/card/style/upd`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  updShareSetup(params) {
    let url = `${API_MODULE}/mini/card/share/setup`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  startupShop(type, entId) {
    let url = `${API_MODULE}/mini/shop/startup/${type}/${entId}`
    return httpRequest.get({
      'url': url
    })
  },
  addProduct(params) {
    let url = `${API_MODULE}/mini/shop/product/add`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  updProduct(params) {
    let url = `${API_MODULE}/mini/shop/product/upd`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  delProduct(productId) {
    let url = `${API_MODULE}/mini/shop/product/del/${productId}`
    return httpRequest.get({
      'url': url
    })
  },
  getProductList(entId) {
    let url = `${API_MODULE}/mini/shop/product/list/${entId}`
    return httpRequest.get({
      'url': url
    })
  },
  getCategoryList(entId) {
    let url = `${API_MODULE}/mini/shop/offer/category/list/${entId}`
    return httpRequest.get({
      'url': url
    })
  },
  addCategory(param) {
    let url = `${API_MODULE}/mini/shop/offer/category/add`
    return httpRequest.post({
      'url': url,
      params: param
    })
  },
  delCategory(id) {
    let url = `${API_MODULE}/mini/shop/offer/category/del/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  getOfferList(entId, categoryId) {
    let url = `${API_MODULE}/mini/shop/offer/list/${entId}/${categoryId}`
    return httpRequest.get({
      'url': url
    })
  },
  getOfferListByStatus(entId, status, categoryId) {
    let url = `${API_MODULE}/mini/shop/offer/list/${entId}/${status}/${categoryId}`
    return httpRequest.get({
      'url': url
    })
  },
  addOffer(params) {
    let url = `${API_MODULE}/mini/shop/offer/add`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  updOffer(params) {
    let url = `${API_MODULE}/mini/shop/offer/upd`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  delOffer(id) {
    let url = `${API_MODULE}/mini/shop/offer/del/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  recommendOffer(id) {
    let url = `${API_MODULE3}/staff/offer/${id}`
    return httpRequest.post({
      'url': url
    })
  },
  recommendOfferCancel(id) {
    let url = `${API_MODULE3}/staff/offer/${id}`
    return httpRequest.delete({
      'url': url
    })
  },
  getRecommendOfferList(staffId, entId) {
    let url = `${API_MODULE3}/staff/offer/list/${staffId}/${entId}`
    return httpRequest.post({
      'url': url,
      params: {
        page_num: 1,
        page_size: 20
      }
    })
  },
  updOfferStatus(status, id) {
    let url = `${API_MODULE}/mini/shop/offer/updOfferStatus/${status}/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 删除七牛云的资源
   */
  deleteResouces(fileName) {
    let url = `${API_MODULE}/mini/deleteResources`
    return httpRequest.post({
      'url': url,
      params: {
        fileName: fileName
      }
    })
  },
  getEnterprise(staffId) {
    let url = `${API_MODULE}/mini/getEnterprise/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  getStaffNum(enterpriseId) {
    let url = `${API_MODULE}/mini/getStaffNum/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  updCardImg(cardImgUrl) {
    let url = `${API_MODULE}/mini/updCardImg`
    return httpRequest.post({
      'url': url,
      params: {
        fileName: cardImgUrl
      }
    })
  },
  getRadarPermissions(staffId) {
    let url = `${API_MODULE}/mini/getRadarPermissions/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取文件夹目录
  getFileDir(enterpriseId) {
    let url = `${API_MODULE}/mini/getFileDir/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取文件列表
  getFileList(dirId, page) {
    let url = `${API_MODULE}/mini/getFileList?dir_id=${dirId}`
    return httpRequest.post({
      'url': url,
      params: page
    })
  },
}
export default cardManagerApi
