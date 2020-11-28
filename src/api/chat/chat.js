// 聊天接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/v1.0`

const chatApi = {
  /**
   * 获取员工头像等信息
   * @param  {[type]} id        员工id
   */
  getChatFromInfo(id) {
    let url = `${API_MODULE}/staff/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取自己IM相关信息
   */
  getIMParams() {
    let url = `${apiAdress}/${apiRoot}/v3.0/userList/simple`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取消息列表的图像
   */
  getMsgListPromise(params) {
    let url = `${apiAdress}/${apiRoot}/v3.0/userhead`
    return httpRequest.post({
      'url': url,
      params: params
    })
  }
}

export default chatApi
