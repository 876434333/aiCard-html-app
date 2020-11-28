import wepy from 'wepy'
import {
  cardActionMap
} from '@/utils'

export default class CardDetailMixin extends wepy.mixin {
  props = {
    syncData: {
      type: Object,
      default: {}
    },
    phoneNumberAuth: {
      type: Boolean
    },
    syncTitle: {
      type: String,
      default: 'null'
    },
    // 是否自己的名片
    isMyself: {
      type: Number,
      default: 0
    },
    // 是否预览的名片
    isPreview: {
      type: Number,
      default: 0
    },
    // 是否看名片
    isView: {
      type: Number,
      default: 0
    }
  }
  methods = {
    // 拨打或者复制
    callOrCopy(item) {
      let connect = item.connect
      let type = item.type
      if (type === 1) {
        this.call(connect)
      } else {
        this.copy(connect, type)
      }
    }
  }
  /**
   * 获取当前所在page
   */
  getPage() {
    return this.$root
  }
  // 拨打电话
  call(text) {
    let action = cardActionMap.callPhone
    if (text) {
      wepy.makePhoneCall({
        phoneNumber: text
      })
    }
    // 记录点击行为
    this.getPage().recordClickAction(action)
  }
  copy(text, type) {
    wepy.setClipboardData({
      data: text
    }).then(() => {
      wepy.showToast({
        title: '已复制到系统剪贴板',
        icon: 'none',
        duraton: 1000
      })
    })
    let action = ''
    if (type === 2) {
      action = cardActionMap.copyWeixin
    } else if (type === 3) {
      action = cardActionMap.copyMail
    } else if (type === 4) {
      action = cardActionMap.copyAddress
    }
    this.getPage().recordClickAction(action)
  }
  // 写入手机系统通讯录
  saveToPhoneContact() {
    this.getPage().recordClickAction(cardActionMap.saveCardInfo)
    wepy.addPhoneContact({
      firstName: this.syncData.name,
      mobilePhoneNumber: this.syncData.phone,
      weChatNumber: this.syncData.weixin,
      title: this.syncData.station,
      workPhoneNumber: this.syncData.phone,
      email: this.syncData.mail,
      workAddressStreet: this.syncData.address
    })
  }
}
