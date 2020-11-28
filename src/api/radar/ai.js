// 雷达接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/v3.0`

const aiRadarApi = {
  /**
   * 提交跟进内容
   */
  submitFollow(params) {
    let url = `${API_MODULE}/follow`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 更新用户信息
   */
  updataUserInfo(params) {
    let url = `${API_MODULE}/user/edit`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 按时间用户浏览记录
   */
  getActionList(params) {
    let url = `${API_MODULE}/action/list`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 按人分类获取点击行为
   */
  getActionByPeople(params) {
    let url = `${API_MODULE}/interact`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 获取按人分类的细节
   */
  getActionByPeopleDetail(params) {
    let url = `${API_MODULE}/interact/detail`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 获取行为主页面数据
  actionListPromise(params) {
    let url = `${API_MODULE}/action`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 获取行为详情数据
  actionDetailsPromise(params) {
    let url = `${API_MODULE}/action/action_by_code`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 客户api
  clientListPromise(params) {
    let url = `${API_MODULE}/user/list`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 获取客户基本信息
  clientSimplePromise(params) {
    let url = `${API_MODULE}/user/simple/?user_id=${params}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 互动跟进
   * type (integer): 类型 1互动与跟进 0跟进 ,
   */
  followAndLogListPromise(params) {
    let url = `${API_MODULE}/user/follow_and_log/page`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  interactListPromise(params) {
    let url = `${API_MODULE}/action/action_by_code`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  followListPromise(params) {
    let url = `${API_MODULE}/user/follow/page`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 获取图表数据
  analysisListPromise(userId, type) {
    let url = `${API_MODULE}/user/ai/analysis?user_id=${userId}&type=${type}`
    return httpRequest.get({
      'url': url
    })
  },
  followPromise(params) {
    let url = `${API_MODULE}/follow`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /*
    * 设置成交日期
    */
  setWinTimePromise(params) {
    let url = `${API_MODULE}/clinch_time`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /*
    * 设置成交率
    */
  setWinRalePromise(params) {
    let url = `${API_MODULE}/clinch_rate`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /*
    * 获取用户信息
    */
  getClientDetailsPromise(params) {
    let url = `${API_MODULE}/user/detail?user_id=${params}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 编辑用户信息
   */
  editClientDetailsPromise(params) {
    let url = `${API_MODULE}/user/edit`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  }
}
export default aiRadarApi
