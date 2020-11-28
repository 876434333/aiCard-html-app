import wepy from 'wepy'
// import {CARD_LIST, APPLY_FOR_AUTHORIZE} from '@/router'
import {
  CARD_LIST,
  PRODUCT_LIST
} from '@/router'

export default class fromShareMixin extends wepy.mixin {
  data = {
    sellerId: null,
    enterpriseId: null,
    departmentId: null,
    fromOpenid: null,
    fromShareOption: {
      login: false,
      data: null,
      firstNoticeMsg: false
    },
    firstShow: true
  }
  onLoad(option) {
    this.setScence(option)
    this.setEmployee(option)
    this.whetherAuthorize()
  }
  /**
   * 保存场景值
   * @param  {[type]} options url参数
   */
  setScence(option) {
    if (option.scene) {
      this.$parent.saveScene(option.scene)
    }
  }
  /**
   * 设置当前的员工
   * @param  {[type]} option url参数
   */
  setEmployee(option) {
    let employee = this.$parent.getNowEmployee()
    if (!employee.employeeId || option.employee_id && option.employee_id !== employee.employeeId) {
      // 从分享进来的、并且跟刚才的销售不是同一个，需要重新登录
      this.sellerId = option.employee_id
      this.enterpriseId = option.enterprise_id
      this.departmentId = option.department_id
      // 保存销售的聊天账号
      this.$parent.saveEmployeeChatUser(this.sellerId, this.sellerId)
      this.$parent.saveNowEmployee(this.sellerId, this.enterpriseId, this.departmentId)
      this.fromShareOption.data = option
      this.fromOpenid = option.from_openid
      this.fromShareOption.login = true
      this.fromShareOption.firstNoticeMsg = true
    } else {
      // 非分享进来的/分享进来后重新打开的
      this.sellerId = employee.employeeId
      this.enterpriseId = employee.enterpriseId
      this.departmentId = employee.departmentId
    }
  }
  // 检查是否授权
  whetherAuthorize() {
    // 判断用户是否授权
    wepy.getSetting().then((res) => {
      if (res.authSetting['scope.userInfo']) {
        // 已授权
        this.isAuthorized()
      } else {
        // 未授权，跳转到授权页面
        this.toAuthorize()
      }
    })
  }
  /**
   * 已授权
   */
  isAuthorized() {
    if (this.fromShareOption.login) {
      // 从分享进来
      this.login()
    } else {
      this.afterLogin()
    }
  }
  /**
   * 登录
   */
  login() {
    // 从分享进来
    this.$parent.setWxUserInfo().then(wxUserInfo => {
      this.$parent.getAndSetOpenid(this.sellerId, this.enterpriseId).then(openid => {
        // 判断是否需要登录聊天
        let chatUserInfo = this.$parent.getChatUserInfo()
        if (!chatUserInfo) {
          this.$parent.getUserChatLoginInfo(openid, this.sellerId, this.enterpriseId, () => {
            this.showMsgNumb()
            this.afterChatLogin()
          })
        }
        // 登录
        let employee = {
          employeeId: this.sellerId,
          enterpriseId: this.enterpriseId
        }
        let fromOpenid = this.fromOpenid
        this.$parent.login(employee, wxUserInfo, openid, fromOpenid, () => {
          this.fromShareOption.login = false
          this.fromOpenid = ''
          this.afterLogin()
        })
      })
    })
  }
  /**
   * 聊天登录后,聊天相关的业务
   */
  afterChatLogin() {}
  /**
   * 页面的主要业务，非聊天相关
   * @return {[type]} [description]
   */
  afterLogin() {}
  /**
   * 获取销售员名片信息
   * @param  {[type]} sessionId [description]
   */
  getSellerInfo() {
    this.$parent.getSellerCardDetail(this.sellerId).then(sellerInfo => {
      this.sellerInfo = sellerInfo
      // this.$parent.saveSellerInfo(this.sellerId, sellerInfo)
      this.$apply()
    }).catch((err) => {
      this.isInvalidCard(err)
    })
  }
  /**
   * 提示未读消息
   */
  showMsgNumb() {
    let friendId = this.$parent.getEmployeeChatUser(this.sellerId)
    if (friendId) {
      this.noReadNum = this.$parent.getNotReadMsgNum(friendId)
      this.$apply()
      // 第一次进来
      if (this.fromShareOption.firstNoticeMsg) {
        this.showFirstNotice()
        this.fromShareOption.firstNoticeMsg = false
      }
    }
  }
  /**
   * 第一次进名片，弹框提示一下
   * @return {[type]} [description]
   */
  showFirstNotice() {}
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
   * 关闭所有页面，并重新打开当前页面
   */
  closeAllPageAndReopen(option) {
    let fromOpenid = option.from_openid
    let url = `${PRODUCT_LIST}?fo=${fromOpenid}&rf=1`
    wepy.reLaunch({
      url: url
    })
  }

  /**
   * 前往名片列表
   */
  toCardList() {
    this.$parent.saveNowEmployee()
    let url = CARD_LIST + '?enterprise_id=' + this.enterpriseId
    wepy.reLaunch({
      url: url
    })
  }
}
