// 明信片接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const companyApi = {
  getCurrentEnterpriseInfo(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getCurrentEnterpriseInfo/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  getEnterpriseList(openId) {
    let url = `${API_MODULE}/mini/card/getEnterpriseList/${openId}`
    return httpRequest.get({
      'url': url
    })
  },
  getStaffInfoFromBack(openid) {
    let url = `${API_MODULE}/mini/card/getStaffInfo/${openid}`
    return httpRequest.get({
      'url': url
    })
  },
  companyAdd(params) {
    let url = `${API_MODULE}/mini/card/addCard`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 更新名片基本信息
   */
  updataCardBaseInfo(params) {
    let url = `${API_MODULE}/mini/card/updataCardBaseInfo`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  getPhone(params) {
    let url = `${API_MODULE}/mini/card/getPhone`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  sendMsg(phone) {
    let url = `${API_MODULE}/mini/sendMsg/${phone}`
    return httpRequest.get({
      'url': url
    })
  },
  checkMsg(phone, viliCode) {
    let url = `${API_MODULE}/mini/checkMsg/${phone}/${viliCode}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 解散企业
   */
  dissolveCompany(enterpriseId) {
    let url = `${API_MODULE}/mini/closeEnterprise/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 切换企业
   */
  switchCompany(enterpriseId, openid) {
    let url = `${API_MODULE}/mini/card/switchCompany/${enterpriseId}/${openid}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取部门列表及人数
   */
  getRootDptId(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getRootDptId/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取部门列表及人数
   */
  getDepartmentList(enterpriseId, parentId) {
    let url = `${API_MODULE}/mini/card/getDepartmentList/${enterpriseId}/${parentId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取部门人员列表
   */
  getDepartmentPerson(enterpriseId, parentId) {
    let url = `${API_MODULE}/mini/card/getDepartmentPerson/${enterpriseId}/${parentId}`
    return httpRequest.get({
      'url': url
    })
  },
  getDepartmentPersonByName(enterpriseId, name) {
    let url = `${API_MODULE}/mini/card/getDepartmentPersonByName/${enterpriseId}`
    return httpRequest.get({
      'url': url,
      'params': {'name': name}
    })
  },
  getDeparturePersonList(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getDeparturePersonList/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 增加部门
   */
  addDepartment(params) {
    let url = `${API_MODULE}/mini/card/addDepartment`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 删除部门
   */
  deleteDepartment(params) {
    let url = `${API_MODULE}/mini/card/deleteDepartment`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 修改部门名字
   */
  updataDepartment(params) {
    let url = `${API_MODULE}/mini/card/updataDepartment`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 修改公司名字和logo
   */
  updataCompanyNameOrLogo(params) {
    let url = `${API_MODULE}/mini/card/updataCompanyNameOrLogo`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 获取小程序用户的身份
   */
  getUserRole(enterpriseId, openid) {
    let url = `${API_MODULE}/mini/card/getUserRole/${enterpriseId}/${openid}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取部门树
   */
  getDeptTree(enterpriseId) {
    let url = `${API_MODULE}/mini/card/dept/tree/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 更新员工个人资料
   */
  updataDptPerson(params) {
    let url = `${API_MODULE}/mini/card/dept/updataDptPerson`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 离职工作交接
   */
  handover(params) {
    let url = `${API_MODULE}/mini/card/handover`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 获取企业所有员工
   */
  getEnterpriseStaffList(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getEnterpriseStaffList/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取企业所有员工
   */
  getEnterpriseOnlyStaffList(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getEnterpriseOnlyStaffList/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 复职
   */
  reentry(staffId) {
    let url = `${API_MODULE}/mini/card/reentry/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取管理员及运营者
   */
  getmanagerList(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getMamager/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 转让管理员
   */
  transferManager(params) {
    let url = `${API_MODULE}/mini/card/transferManager`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 增加运营者
   */
  addOperator(staffId) {
    let url = `${API_MODULE}/mini/card/addOperator/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 移除运营者
   */
  removeOperator(params) {
    let url = `${API_MODULE}/mini/card/removeOperator`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 手动增加员工
   */
  addStaff(params) {
    let url = `${API_MODULE}/mini/card/dept/addstaff`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 获取邀请员工信息
   */
  getInviteInfo(params) {
    let url = `${API_MODULE}/mini/card/getInviteInfo`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 微信分享邀请员工
   */
  addStaffByshare(params) {
    let url = `${API_MODULE}/mini/card/addStaffByShare`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  /**
   * 获取认领页面所需的信息
   */
  getClaimInfo(staffId) {
    let url = `${API_MODULE}/mini/card/getClaimInfo/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 通过分享认领员工
   */
  claimStaffByshare(params) {
    let url = `${API_MODULE}/mini/card/claimStaffByShare`
    return httpRequest.post({
      params: params,
      'url': url
    })
  },
  getSameCompanyNameList(params) {
    let url = `${API_MODULE}/mini/card/getSameCompanyName`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  /**
   * 小程序用户通过搜索加入企业
   */
  addStaffBySearch(params) {
    let url = `${API_MODULE}/mini/card/addStaffBySearch`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  /**
   * 获取申请人员和已批准人员列表
   */
  getApproveList(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getApproveList/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 通过或者拒绝申请
   */
  updataApprove(params) {
    let url = `${API_MODULE}/mini/card/updataApprove`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  /**
   * 通过enterpriseId和openid获取staffId
   */
  getStaffByEnterpriseIdAndOpenId(enterpriseId, openid) {
    let url = `${API_MODULE}/mini/card/getStaffByEnterpriseIdAndOpenId/${enterpriseId}/${openid}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取待审批人数
   */
  getPendingPerson(enterpriseId) {
    let url = `${API_MODULE}/mini/card/getPendingPerson/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  }
}

export default companyApi
