// 明信片-通用接口
import httpRequest from '../httpRequest.js'
import {apiAdress, apiRoot, apiVersion} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const commonApi = {
  // 保存用户的手机号
  savePhoneNumber(params) {
    let url = `${API_MODULE}/mini/user/phone`
    return httpRequest.put({
      'url': url,
      params: params
    })
  },
  /**
   * 查看当前用户手机是否已经获取过手机号
   * @param  {[type]} sessionId [description]
   */
  phoneNumberAuth() {
    let url = `${API_MODULE}/mini/user/phone/auth`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 销售人员向用户发送消息
   * @param  {object} params    [description]
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   *         user_id: 用户id
   */
  sendWelcomeFromSeller(params) {
    let url = `${API_MODULE}/mini/sendMsg?staffId=${params.staffId}`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 获取小程序管理员的相关id
   * @param  {object} params
   *         code: string, 小程序登录code
   *         wq_id: string, 微擎id
   */
  getDefaultInfo(params) {
    let url = `${API_MODULE}/mini/default_info`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  /**
   * 获取贴牌商信息
   */
  getOemInfo() {
    let url = `${API_MODULE}/mini/oem_info`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 判断用户是否已经交换过联系方式
   */
  isExchangeContactInformation (staffid) {
    let url = `${API_MODULE}/mini/isExchangeContact/${staffid}`
    return httpRequest.get({
      'url': url
    })
  },
  exchangeContactInformation (phone) {
    let url = `${API_MODULE}/mini/exchangeContact/${phone}`
    return httpRequest.get({
      'url': url
    })
  }
}

export default commonApi