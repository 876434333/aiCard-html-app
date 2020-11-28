import wepy from 'wepy'
import {
  commonApi
} from '@/api'

export default class getPhoneNumberMixin extends wepy.mixin {
  data = {
    phoneNumberAuth: false
  }
  onLoad() {
    this.getPhoneNumberAuth()
    // let openid = this.$parent.getNowOpenid()
    // if (openid) {
    //   this.getPhoneNumberAuth()
    // }
  }
  methods = {
    // 获取手机号码
    getPhoneNumber(e) {
      this.savePhoneNumber(e)
    }
  }
  // 获取手机号码
  savePhoneNumber(e) {
    // 确定
    let method = e.currentTarget.dataset.method
    if (e.detail.iv) {
      // 获取并保存手机号
      let sessionId = this.$parent.getSessionId()
      let openid = this.$parent.getNowOpenid()
      let params = {
        encrypted_data: e.detail.encryptedData,
        iv: e.detail.iv,
        open_id: openid
      }
      commonApi.savePhoneNumber(params, sessionId).then(data => {
        wepy.showToast({
          title: '授权成功',
          icon: 'none',
          duration: 2000
        }).then(() => {
          // 更改获取手机号码的状态
          this.$parent.savePhoneNumberAuth(1).then(() => {
            // 更新当前页的保存手机号码状态、然后跳转
            this.getPhoneNumberAuth(() => {
              this.doMethod(method, e)
            })
          })
        })
      }, () => {
        wepy.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000
        }).then(() => {
          this.doMethod(method, e)
        })
      })
    } else {
      this.doMethod(method, e)
    }
  }
  // 获取手机号授权状态
  getPhoneNumberAuth(callback) {
    this.$parent.getPhoneNumberAuth().then(res => {
      if (res) {
        this.phoneNumberAuth = true
        this.$apply()
      }
      callback && callback()
    })
  }
  // 执行事件
  doMethod(method, e) {
    if (!method) {
      return null
    }
    this[method](e)
  }
}
