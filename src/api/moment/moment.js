// 朋友圈接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion,
  apiVersion3
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`
const API_RELEASEMOMENT = `${apiAdress}/${apiRoot}/${apiVersion3}`

const momentApi = {
  // 获取朋友圈列表-管名片
  getMomentList(params) {
    let url = `${API_RELEASEMOMENT}/Circle/page`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 获取朋友圈列表-看名片
  getMomentListView(params) {
    let url = `${API_MODULE}/mini/Circle`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 朋友圈点赞
  clickPraise(params) {
    let url = `${API_MODULE}/mini/Zan`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 评论朋友圈
  commentMoment(params) {
    let url = `${API_MODULE}/mini/Comment`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 朋友圈详情
  getMomentDetail(id) {
    let url = `${API_MODULE}/mini/CircleDetail/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  // 发布朋友圈
  releaseMoment(params) {
    let url = `${API_RELEASEMOMENT}/user/Circle`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 删除朋友圈 朋友圈id
  deleteMoment(momentId) {
    let url = `${API_RELEASEMOMENT}/user/Circle/${momentId}`
    return httpRequest.delete({
      'url': url
    })
  },
  // 删除评论 评论记录id
  deleteComment(commentId) {
    let url = `${API_RELEASEMOMENT}/user/Comment/${commentId}`
    return httpRequest.delete({
      'url': url
    })
  }
}

export default momentApi
