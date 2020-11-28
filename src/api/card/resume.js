// 个人简介API
import httpRequest from '../httpRequest.js'
import {
  apiAdress,
  apiRoot,
  apiVersion
} from '@/config'

const API_MODULE = `${apiAdress}/${apiRoot}/${apiVersion}`

const resumeApi = {
  resume(staffId, userId) {
    let url = `${API_MODULE}/mini/card/resume/${staffId}/${userId}`
    return httpRequest.get({
      'url': url
    })
  },
  save(param) {
    let url = `${API_MODULE}/mini/card/resume/save`
    return httpRequest.post({
      'url': url,
      params: param
    })
  },
  getImages(staffId) {
    let url = `${API_MODULE}/mini/card/resume/images/${staffId}`
    return httpRequest.get({
      'url': url
    })
  },
  getLabels(staffId, userId) {
    let url = `${API_MODULE}/mini/card/resume/label/${staffId}/${userId}`
    return httpRequest.get({
      'url': url
    })
  }
}

export default resumeApi
