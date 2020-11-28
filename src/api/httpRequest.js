import wepy from 'wepy'
import 'wepy-async-function'
import siteInfo from '@/siteinfo.js'
import {getBase} from './apiUrl'

// 签名
const sign = (signObj = {}, url) => {
  // 自行加密
  return signObj
}

// GET请求
const GET = (requestHandler, sessionId, isShowLoading) => {
  return request('GET', sign(requestHandler), sessionId, isShowLoading)
}

// POST请求
const POST = (requestHandler, sessionId, isShowLoading) => {
  return request('POST', sign(requestHandler), sessionId, isShowLoading)
}

// PUT请求
const PUT = (requestHandler, sessionId, isShowLoading) => {
  return request('PUT', sign(requestHandler), sessionId, isShowLoading)
}

// DELETE请求
const DELETE = (requestHandler, sessionId, isShowLoading) => {
  return request('DELETE', sign(requestHandler), sessionId, isShowLoading)
}

const noticeErr = function(data) {
}

const request = (method, requestHandler, sessionId, isShowLoading = true) => {
  // 加密
  let params = requestHandler.params ? requestHandler.params : {}
  sessionId = wepy.$instance.getSessionId()
  // 获取域名
  let promise = new Promise((resolve, reject) => {
    getBase().then((apiUrl) => {
      // 拼接上域名
      let url = `${apiUrl}${requestHandler.url}`
      if (!sessionId) {
        sessionId = ''
      }
      wepy.request({
        url: url,
        data: params,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'Content-Type': 'application/json',
          'session_id': sessionId,
          'uniacid': siteInfo.uniacid
        }
      }).then(res => {
        // 后台处理成功
        if (res.statusCode === 502) {
          reject(res.data)
          wepy.showModal({
            content: '服务请求失败',
            showCancel: false
          })
        } else if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          noticeErr(res.data)
          reject(res.data)
        }
      },
      err => {
        // 后台处理失败
        console.info(err.errMsg)
        // wepy.showModal({
        //   content: '网络开小差了~~,请下拉加载吧',
        //   showCancel: false
        // })
      })
    })
  })
  return promise
}

const httpRequest = {
  get: GET,
  post: POST,
  put: PUT,
  delete: DELETE
}

export default httpRequest
