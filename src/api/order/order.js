// 订单接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const orderApi = {
  // 根据open_id查看用户
  getUserId(params) {
    let url = `${API_MODULE}/mini/findUserInfo`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 获取我的订单
  getMyOrder() {
    let url = `${API_MODULE}/mini/order/order_summary`
    return httpRequest.get({
      'url': url
    })
  },
  // 看名片获取我的订单列表
  getMyOrderList(params) {
    let url = `${API_MODULE}/mini/order/list`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 管名片获取销售订单列表
  getOrderListByStaff(params, staffId) {
    // let url = `${API_MODULE}/mini/Order`
    let url = `${API_MODULE}/mini/order/staffOrder/${staffId}`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 管名片获取企业订单列表
  getOrderListByEnterprise(params, entId) {
    // let url = `${API_MODULE}/mini/Order`
    let url = `${API_MODULE}/mini/order/enterpriseOrder/${entId}`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 获取订单详情
  getOrderDetail(id) {
    let url = `${API_MODULE}/mini/order/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 下单但未付款
   *     http://api.xxxx.com/push/swagger-ui.html#!/StoreController/addorderUsingPOST
   * @param {*} params
   *         address: string, 收货地址
   *         express_fee: integer, 快递费用
   *         link_man: string, 联系人
   *         link_phone: integer, 联系电话
   *         staff_id: string, 员工id
   *         total_price: integer, 商品总价
   *         total_price_discount: integer, 实付金额
   *         user_id: string, 用户id
   *         num: integer, 购买数量
   *         order_detail: array, 订单明细
   *              norm_id: string, 规格id
   *              num: integer, 购买数量
   *              offer_id: integer, 产品ID
   */
  newOrder(params) {
    let url = `${API_MODULE}/mini/pay`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  // 删除
  delOrder(id) {
    let url = `${API_MODULE}/mini/order/${id}`
    return httpRequest.delete({
      'url': url
    })
  },
  /**
   * 根据id获取未支付订单信息
   * @param  {string} id 订单id
   */
  getOrderToPay(id) {
    let url = `${API_MODULE}/mini/pay/${id}`
    return httpRequest.post({
      'url': url
    })
  },
  /**
   * 取消订单
   * @param  {string} id 订单id
   */
  handCancelOrder(id) {
    let url = `${API_MODULE}/mini/order/cancel/${id}`
    return httpRequest.delete({
      'url': url
    })
  },
  /**
   * 确认收货
   * @param  {string} id 订单id
   */
  sureReceiveOrder(id) {
    let url = `${API_MODULE}/store/update_order_status/${id}`
    return httpRequest.put({
      'url': url
    })
  },
  sendGoodsOrder(id) {
    let url = `${API_MODULE}/mini/order/update_status/${id}`
    return httpRequest.put({
      'url': url
    })
  },
  getShopPayType(enterpriseId) {
    let url = `${API_MODULE}/mini/shop/isPay/${enterpriseId}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 未开通商城支付下单接口
   */
  createOrder(params) {
    let url = `${API_MODULE}/mini/createOrder`
    return httpRequest.post({
      'url': url,
      params: params
    })
  }
}

export default orderApi
