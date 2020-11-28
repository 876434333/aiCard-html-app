// 明信片接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const cardApi = {
  getCardList(params) {
    let url = `${API_MODULE}/mini/card/list`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  getCardDetail(id) {
    let url = `${API_MODULE}/mini/card/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  getSalerCardDetail(staffId, openid) {
    let url = `${API_MODULE}/mini/card/${staffId}/${openid}`
    return httpRequest.get({
      'url': url
    })
  },
  clickAction(params, sessionId) {
    let url = `${API_MODULE}/ClickAction`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 屏蔽名片
  shieldCard(params) {
    let url = `${API_MODULE}/mini/card/action`
    return httpRequest.put({
      'url': url,
      params: params
    })
  },
  // 获取员工的IM聊天id
  getEmployeeChatUid(id) {
    let url = `${API_MODULE}/mini/findStaffById/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  // 发送formid到服务器
  sendFormId(formId) {
    let url = `${API_MODULE}/user_form_add?formid=${formId}`
    return httpRequest.post({
      'url': url
    })
  },
  // 推送未读消息到销售端
  sendToSale(params) {
    let url = `${apiAdress}/${apiRoot}/v4.0/common/send_to_sale`
    return httpRequest.get({
      'url': url,
      params: params
    })
  },
  // 获取生成海报需要的信息，小程序码、公司logo、公司名称
  getBillInfo(staffId) {
    let url = `${API_MODULE}/mini/enterprise/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取名片模板id
   * http://api.xxxx.com/push/swagger-ui.html#!/UserController/getStaffTemlateUsingGET 
   * @param  {[string]} id 员工id
   */
  getTemplate(id) {
    let url = `${API_MODULE}/mini/card/temlate/${id}`
    return httpRequest.get({
      'url': url
    })
  },

  sendQrCodeToEmail(param) {
    let url = `${API_MODULE}/mini/sendEmail`
    return httpRequest.post({
      'url': url,
      params: param
    })
  },

  getShopType(entId) {
    let url = `${API_MODULE}/mini/shop/type/${entId}`
    return httpRequest.get({
      'url': url
    })
  },

  // 判断有没有创建过名片
  createCard(openId) {
    let url = `${API_MODULE}/mini/isExistCard/${openId}`
    return httpRequest.get({
      'url': url
    })
  },

  // 获取推荐名片列表
  getRecommendCard() {
    let url = `${API_MODULE}/mini/getRecommendCard`
    return httpRequest.get({
      'url': url
    })
  },

  // 查看推荐名片
  viewRecommendCard(staffId) {
    let url = `${API_MODULE}/mini/viewRecommendCard/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },

  // 管名片发送服务通知(销售给用户发送服务通知)
  sendMsg(userId, params) {
    let url = `${apiAdress}/${apiRoot}/v4.0/common/send_to_mini?userid=${userId}`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 发送服务通知(用户给销售发服务通知)
  sendMsgToSale(staffId, params) {
    let url = `${apiAdress}/${apiRoot}/v4.0/common/mini_send_to_sale?staffId=${staffId}`
    return httpRequest.post({
      'url': url,
      params: params
    })
  }
}

export default cardApi
