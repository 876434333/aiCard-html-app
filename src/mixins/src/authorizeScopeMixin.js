import wepy from 'wepy'

export default class AuthorizeScopeMixin extends wepy.mixin {
  data = {
    openSetting: false
  }
  methods = {
    /**
     * 编辑默认地址
     * @param {[object]} e 触发事件的元素
     */
    wxAddress(e) {
      this.getSetting('scope.address').then((res) => {
        if (res === null) {
          // 弹出授权请求
          this.authorize('scope.address').then(() => {
            this.wxChooseAddress(e)
          }, () => {})
        } else {
          // 打开选择地址页面
          this.wxChooseAddress(e)
        }
      })
    }
  }
  /**
   * 判断是否授权
   */
  getSetting(scope) {
    let promise = new Promise((resolve, reject) => {
      wepy.getSetting().then(res => {
        if (res.authSetting[scope]) {
          // 已授权
          resolve(true)
        } else if (res.authSetting[scope] === false) {
          // 之前拒绝了授权
          reject(res.authSetting)
        } else {
          // 还未第一次申请授权
          resolve(null)
        }
      })
    })
    return promise
  }
  /**
   * 申请授权
   */
  authorize(scope) {
    let promise = new Promise((resolve, reject) => {
      wepy.authorize({
        scope: scope
      }).then(res => {
        resolve()
      }, err => {
        // 拒绝授权，或之前已经拒绝
        this.showOpenSetting()
        reject()
      })
    })
    return promise
  }
  /**
   * 检查授权
   * @param  {[string]} scope 权限
   */
  checkAuthorize(scope) {
    this.getSetting(scope).then(() => {
      // 之前未申请过授权，或者已授权
      this.closeOpenSetting()
    }).catch(() => {
      // 之前拒绝了授权
      this.showOpenSetting()
    })
  }
  /**
   * 渲染授权的button
   */
  showOpenSetting() {
    this.openSetting = true
    this.$apply()
  }
  /**
   * 不渲染授权的button
   */
  closeOpenSetting() {
    if (this.openSetting) {
      this.openSetting = false
      this.$apply()
    }
  }
  /**
   * 打开openSetting的回调
   * @param  {[type]} res 授权结果
   */
  afterOpensetting(res) {}
  /**
   * 打开选择地址
   * @param {[object]} e 触发事件的元素
   */
  wxChooseAddress(e) {}
}