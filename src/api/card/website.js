import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`
const websiteApi = {
  getWebsite(enter) {
    let url = `${API_MODULE}/mini/website/get/${enter}`
    return httpRequest.get({
      url: url
    })
  },
  addWebsite(params) {
    let url = `${API_MODULE}/mini/website/add`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  updWebsiteComponent(params, id) {
    let url = `${API_MODULE}/mini/website/component/upd/${id}`
    return httpRequest.post({
      'url': url,
      params: params
    })
  },
  getWebsiteComponent(id) {
    let url = `${API_MODULE}/mini/website/component/${id}`
    return httpRequest.get({
      'url': url
    })
  }
}
export default websiteApi
