// 地址接口
import httpRequest from '../httpRequest.js'
import {apiAdress, apiRoot, apiVersion} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}/store`

const addressApi = {
  /**
   * 获取默认收货地址详情
   * @param  {string} id    地址id
   */
  getDefaultAddressDetail(id) {
    let url = `${apiAdress}/${apiRoot}/${apiVersion}/mini/get_default_address/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取收货地址列表
   * @param  {object} params    [description]
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   *         user_id: 用户id
   */
  getAddressList(params) {
    let url = `${API_MODULE}/address`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  /**
   * 获取收货地址详情
   * @param  {string} id    地址id
   */
  getAddressDetail(id) {
    let url = `${API_MODULE}/address/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 修改收货地址
   * @param  {object} params    [description]
   *         address: string, 地址id
   *         province_name: string, 省名
   *         city_name: string, 市名
   *         area_name: string, 区/县名
   *         address : string, 详细地址
   *         name: string, 联系人
   *         user_id: string, 用户id
   */
  updateAddress(params) {
    let url = `${API_MODULE}/address`
    return httpRequest.put({
      'url': url,
      params: params
    })
  },
  /**
   * 新增收货地址
   * @param  {object} params    [description]
   *         address: string, 地址id
   *         province_name: string, 省名
   *         city_name: string, 市名
   *         area_name: string, 区/县名
   *         address : string, 详细地址
   *         name: string, 联系人
   *         user_id: string, 用户id
   */
  addAddress(params) {
    let url = `${API_MODULE}/add/address`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  /**
   * 删除收货地址
   * @param  {object} params    [description]
   *         id: string, 地址id
   *         status: integer, 是否删除（0是删除，1是正常）
   */
  delAddress(params) {
    let url = `${API_MODULE}/address`
    return httpRequest.delete({
      'url': url,
      params: params
    })
  },
  /**
   * 设置默认收货地址
   * @param  {object} params    [description]
   *         id: string, 地址id
   *         is_default: integer, 分是否默认页数
   *         user_id: 用户id
   */
  setDefaultAddress(params) {
    let url = `${API_MODULE}/update_default`
    return httpRequest.put({
      'url': url,
      params: params
    })
  }
}

export default addressApi