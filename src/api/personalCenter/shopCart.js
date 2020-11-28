// 产品接口
import httpRequest from '../httpRequest.js'
import {apiAdress, apiRoot, apiVersion} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}/mini`

const shopCartApi = {
  /**
   * 购物车列表
   *     http://api.xxxx.com/push/swagger-ui.html#!/StoreController/shopCartListUsingPOST
   * @param {*} params
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   */
  getShopCartList(params) {
    let url = `${API_MODULE}/shop_cart/list`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 添加购物车
   *     http://api.xxxx.com/push/swagger-ui.html#!/StoreController/addShopCartUsingPOST
   * @param {*} params
   *         norms_id: string, 规格id
   *         offer_id: string, 商品id
   *         offer_num: integer, 数量
   */
  addShopCart(params) {
    let url = `${API_MODULE}/shop_cart`
    return httpRequest.post({
      'url': url,
      'params': params
    })
  },
  /**
   * 删除购物车
   * @param  {array} params id组成的数组
   */
  delShopCarts(params) {
    let url = `${API_MODULE}/shop_cart`
    return httpRequest.delete({
      'url': url,
      'params': params
    })
  },
  /**
   * 编辑购物车中某一商品
   *     http://api.xxxx.com/push/swagger-ui.html#!/StoreController/editShopcartUsingPUT
   * @param {*} params
   *         norms_id: string, 规格id
   *         offer_id: string, 商品id
   *         num: integer, 购买数量
   */
  editShopcart(params) {
    let url = `${API_MODULE}/shop_cart`
    return httpRequest.put({
      'url': url,
      'params': params
    })
  }
}

export default shopCartApi