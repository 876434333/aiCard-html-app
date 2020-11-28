// 公司接口
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion1
} from '@/config'
const API_MODULE = `${apiAdress}/${apiRoot}/V1.0`


const companyInfoApi = {

  getCompanyDetail(sessionId) {
    // let url = `${API_MODULE}/mini/findWebsite`
    let url = `${API_MODULE}/company/mini/website?__=1541676915342`
    // let url = `http://api.xxxx.com/push/V1.0/company/mini/website?__=1541676915342`
    return httpRequest.get({
      'url': url
    }, sessionId)
  }
}

export default companyInfoApi