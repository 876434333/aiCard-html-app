// 产品接口
import httpRequest from '../httpRequest.js'
import {apiAdress, apiRoot, apiVersion} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const productApi = {
  /**
   * 获取商城产品列表
   * @param  {object} params    [description]
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   *         begin_time: integer, 开始时间
   *         end_time: integer, 结束时间
   *         name_or_phone: string, 电话或者名称
   * @param  {[type]} sessionId [description]
   */
	getProductList(params) {
		let url = `${API_MODULE}/mini/offer/list`
		return httpRequest.post({
			'url': url,
			'params': params
		})
	},
  /**
   * 产品详情
   * @param  {string} id        产品id
   */
	getProductDetail(id) {
		let url = `${API_MODULE}/mini/offer/${id}`
		return httpRequest.get({
      'url': url
    })
	},
  /**
   * 获取规格详情
   *   http://api.xxxx.com/push/swagger-ui.html#!/StoreController/offerNormsUsingGET
   */
  getNorms(id) {
    let url = `${API_MODULE}/mini/norms/${id}`
    return httpRequest.get({
      'url': url
    })
  },
  /**
   * 获取广告
   */
	getAdverts() {
		let url = `${API_MODULE}/mini/Adv`
		return httpRequest.get({
      'url': url
    })
	},
  /**
   * 获取
   *     http://api.xxxx.com/push/swagger-ui.html#!/
   * @param {*} params
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   */
  getCommedList(params) {
    let url = `${API_MODULE}/mini/`
    return httpRequest.get({
      'url': url,
      'params': params
    })
  }
}

export default productApi