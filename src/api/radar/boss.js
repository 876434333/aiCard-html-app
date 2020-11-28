// 雷达接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/v3.0`

const bossRadarApi = {
  // 获取企业信息
  enterpriseInfoPromise(departmentId) {
		let url = `${API_MODULE}/departname?id=${departmentId}`
		return httpRequest.get({
      'url': url
    })
  },
  // 获取总览汇总数据
  dataViewPromise(type, departmentId) {
    let url = `${API_MODULE}/boss/index/view?type=${type}&department_id=${departmentId}`
		return httpRequest.get({
      'url': url
    })
  },
  // 获取成交率漏斗数据
  funnelPromise(params) {
    let url = `${API_MODULE}/boss/index/funnel`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 获取商城订单量&交易金额数据
  orderAmoneyPromise(params) {
    let url = `${API_MODULE}/boss/index/order_money`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 获取客户统计--跟进客户数
  attachPromise(params) {
    let url = `${API_MODULE}/boss/index/attach?day=${params.day}&department_id=${params.departmentId}`
		return httpRequest.get({
      'url': url
    })
  },
  // 获取客户统计--新增订单数
  imPromise(params) {
    let url = `${API_MODULE}/boss/index/im?day=${params.day}&department_id=${params.departmentId}`
		return httpRequest.get({
      'url': url
    })
  },
  // 获取客户统计--新增客户数
  userPromise(params) {
    let url = `${API_MODULE}/boss/index/user?day=${params.day}&department_id=${params.departmentId}`
		return httpRequest.get({
      'url': url
    })
  },
  // 获取销售排行数据
  orderPromise(params) {
    let url = `${API_MODULE}/boss/staff/orderBy`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 能力分析数据
  analysisPromise(departmentId) {
    let url = `${API_MODULE}/boss/staff/analysis?department_id=${departmentId}`
		return httpRequest.get({
      'url': url
    })
  },
  // 切换部门
  departListPromise() {
    let url = `${API_MODULE}/departList`
		return httpRequest.get({
			'url': url
		})
  },
  // 雷达能力分析详情页接口
  // 获取名片信息
  userInfoPromise(staffId, departmentId) {
    let url = `${API_MODULE}/boss/user_info/${staffId}?department_id=${departmentId}`
    return httpRequest.get({
      'url': url
    })
  },
  // 获取客户总数
  userCusInfoPromise(staffId, departmentId) {
    let url = `${API_MODULE}/boss/user_cus_info/${staffId}?department_id=${departmentId}`
    return httpRequest.get({
      'url': url
    })
  },
    /**
   * 互动跟进
   * type (integer): 类型 1互动与跟进 0跟进 ,
   */
  followAndLogListPromise(params) {
    let url = `${API_MODULE}/boss/follow_and_log/page`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  // 雷达能力详情图表数据
  detailAnalysisPromise(staffId, departmentId) {
    let url = `${API_MODULE}/boss/analysis/${staffId}?department_id=${departmentId}`
    return httpRequest.get({
      'url': url
    })
  },
  detailDataViewPromise(params) {
    let url = `${API_MODULE}/boss/view/${params.staffId}?department_id=${params.departmentId}&type=${params.type}`
    return httpRequest.get({
      'url': url
    })
  }
}
export default bossRadarApi
