import wepy from 'wepy'
import {cardApi} from '@/api'

export default class SaveFormidMixin extends wepy.mixin {
  methods = {
    /**
     * 提交formid
     * @param  {object} e form对象
     */
    formSubmit(e) {
      this.saveFormid(e)
    }
  }
  /**
   * 保存formid
   * @param  {object} e form对象
   */
  saveFormid(e) {
    let formId = e.detail.formId
    if (formId === 'the formId is a mock one') {
      return
    }
    cardApi.sendFormId(formId)
  }
}