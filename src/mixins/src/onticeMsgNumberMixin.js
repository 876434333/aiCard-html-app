import wepy from 'wepy'
import WebIM from '../../assets/js/webIM/index'

export default class onticeMsgNumberMixin extends wepy.mixin {
  data = {
    noReadNum: 0,
    firstShow: true
  }
  onShow() {
    if (!this.firstShow) {
      this.showMsgNumb()
    }
  }
  onUnload() {
    this.firstShow = true
  }
  methods = {
    // 发消息
    toSendMsg() {
      this.toSendMsg()
    }
  }
  toSendMsg() {
    let sellerInfo = this.$parent.getSellerInfo(this.salerId)
    let userInfo = this.$parent.globalData.userInfo
    let chatUserInfo = this.$parent.getChatUserInfo()
    let friendId = this.$parent.getEmployeeChatUser(this.salerId)
    let loginInfo = {
      name: chatUserInfo.identifier,
      nickName: userInfo.nickName,
      avtor: userInfo.avatarUrl
    }
    let friend = {
      name: friendId,
      avtor: sellerInfo.head_icon,
      nickName: sellerInfo.name
    }
    this.$parent.goChatRoom(loginInfo, friend)
  }
  // 更新当前页的未读消息数
  showMsgNumb() {
    let friendId = this.$parent.getEmployeeChatUser(this.salerId)
    if (friendId) {
      this.noReadNum = this.$parent.getNotReadMsgNum(friendId, WebIM.SESSION_TYPE.C2C)
      this.$apply()
      if (this.firstShow) {
        this.firstShow = false
      }
    }
  }
  // 未读消息+1
  addMsgNumb(num) {
    this.noReadNum = num
    this.$apply()
  }
}