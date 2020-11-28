import wepy from 'wepy'
import {
  CARD_LIST
} from '@/router'

export default class detailMixin extends wepy.mixin {
  data = {
    changeEmployee: false,
    sellerInfo: null,
    fromScence: null,
    urlParams: null
  }

  onLoad(options, data) {
    // 保存场景值
    if (options.scene) {
      this.$parent.saveScene(options.scene)
    }
    let employee = this.$parent.getNowEmployee()
    // 设置page/全局的员工id
    if (data.preload && data.preload.fromList) {
      // 从列表页进来的
      this.staffId = employee.employeeId
      this.enterpriseId = employee.enterpriseId
      this.departmentId = employee.departmentId
      this.fromScence = 1
    } else {
      // 从分享进来的
      this.staffId = options.employee_id
      this.enterpriseId = options.enterprise_id
      this.departmentId = options.department_id
      // 与所保存的全局当前的员工不同
      if (employee.employeeId !== this.staffId) {
        this.$parent.saveNowEmployee(this.staffId, this.enterpriseId, this.departmentId)
        this.changeEmployee = true
      }
      this.fromScence = 2
    }
    this.urlParams = options
  }

  init() {
    let params = this.urlParams
    if (this.fromScence === 1) {
      this.formList(params)
    } else if (this.fromScence === 2) {
      this.fromShare(params)
    }
  }

  /**
   * 从分享进入的
   * @param  {object} params url参数
   */
  fromShare(params) {
    // throw new Error('请重写fromShare提供URL参数')
  }

  /**
   * 从列表进入的
   * @param  {object} params url参数
   */
  formList(params) {
    // throw new Error('请重写formList')
  }

  /**
   * 检查是否授权
   * @param  {[type]} data [description]
   */
  whetherAuthorize(data) {
    wepy.getSetting().then((res) => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，是否有用户信息、openid、登录、im聊天、详情等
        this.setUserInfo()
      } else {
        // 未授权，跳转到授权页面
        this.$parent.toAuthorize(data)
      }
    })
  }

  // 获取用户信息
  setUserInfo() {
    let userInfo = this.$parent.getUserInfo()
    if (!userInfo) {
      this.$parent.setWxUserInfo().then((userInfo) => {
        this.setOpenid()
      })
    } else {
      this.setOpenid()
    }
  }

  // 获取openid
  setOpenid() {
    // 非缓存版本
    let openid = this.$parent.getNowOpenid()
    if (!openid) {
      this.$parent.getOpenId('', this.enterpriseId).then((openid) => {
        this.loginBefore(openid)
      })
    } else {
      this.loginBefore(openid)
    }
    // 缓存版本
    // this.$parent.getAndRefreshOpenid(this.sellerId, this.enterpriseId).then(openid => {
    //   this.loginBefore(openid)
    // })
  }

  // 登录之前
  loginBefore(openid) {
    this.toLogin(openid)
  }

  // 登录
  toLogin(openid) {
    let employeeInfo = {
      employeeId: this.staffId,
      enterpriseId: this.enterpriseId
    }
    let userInfo = this.$parent.globalData.userInfo
    this.$parent.login(employeeInfo, userInfo, openid).then((res) => {
      this.getSellerInfo()
      this.loginAfter(openid)
    })
  }

  /**
   * 获取销售员名片信息
   * @param  {[type]} sessionId [description]
   */
  getSellerInfo() {
    this.$parent.getSellerCardDetail(this.staffId).then((sellerInfo) => {
      this.sellerInfo = sellerInfo
      this.$apply()
      this.afterGetSellerInfo()
    }).catch((err) => {
      this.isInvalidCard(err)
    })
  }

  /**
   * 登录/验证完之后
   * @return {[type]} [description]
   */
  loginAfter() {}

  /**
   * 获取完用户信息之后
   * @return {[type]} [description]
   */

  afterGetSellerInfo() {}

  /**
   * 无效名片
   * @param  {[type]}  err [description]
   * @return {Boolean}     [description]
   */
  isInvalidCard(err) {
    if (err.err_code === 1000) {
      wepy.showModal({
        title: '提示',
        content: '名片已失效',
        showCancel: false
      }).then(() => {
        this.toCardList()
      })
    }
  }

  /**
   * 前往名片列表
   * @return {[type]} [description]
   */
  toCardList() {
    this.$parent.saveNowEmployee('')
    let url = CARD_LIST + '?enterprise_id=' + this.enterpriseId
    wepy.reLaunch({
      url: url
    })
  }
}
