import WebIM from './webIM/sdk/webim'
import wepy from 'wepy'
import {
  CHAT_ROOM,
  CARD_DETAIL
} from '@/router'


const webIMConnListen = function (that) {
  const getWxApp = () => {
    return wepy.$instance
  }
  // 监听连接状态回调变化事件
  const onConnNotify = (resp) => {
    var info
    switch (resp.ErrorCode) {
      case WebIM.CONNECTION_STATUS.ON:
        WebIM.Log.warn('建立连接成功: ' + resp.ErrorInfo)
        break
      case WebIM.CONNECTION_STATUS.OFF:
        info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo
        // alert(info)
        WebIM.Log.warn(info)
        break
      case WebIM.CONNECTION_STATUS.RECONNECT:
        info = '连接状态恢复正常: ' + resp.ErrorInfo
        // alert(info)
        WebIM.Log.warn(info)
        break
      default:
        WebIM.Log.error('未知连接状态: =' + resp.ErrorInfo)
        break
    }
  }
  // IE9(含)以下浏览器用到的 jsonp 回调函数，
  const jsonpCallback = (res) => {
    WebIM.Log.error('IE9(含)以下jsonp回调函', res)
  }
  // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
  // newMsgList 为新消息数组，结构为[Msg]
  const onMsgNotify = (newMsgList) => {
    var newMsg, selSess
    var page = that.getRoomPage()
    var nowPages = getCurrentPages()
    var currentPage = nowPages[nowPages.length - 1]
    var selToID = that.getEmployeeChatUser(that.globalData.curSellerInfo.staffId)
    for (var j in newMsgList) { //遍历新消息
      newMsg = newMsgList[j]
      // 为当前聊天对象的消息
      selSess = newMsg.getSession()
      let path = '/' + currentPage['route']
      let app = getWxApp()
      let nowPageObj = app.$pages[path]
      if (newMsg.getFromAccount() === selToID && page && path === CHAT_ROOM) {
        // 在聊天窗体中新增一条消息，并上报已读
        that.hasRead(selSess, true, false)
        // console.warn(newMsg)
        page.receiveMsg(newMsg, newMsg.getSubType(), 0)
      } else if (newMsg.getFromAccount() === selToID && path !== CHAT_ROOM) {
        // 在详情页更新未读数
        if (nowPageObj.addMsgNumb) {
          nowPageObj.addMsgNumb(selSess.unread())
        }
        that.hasRead(selSess, false, false)
        // 弹窗提示，2种方法
        // nowPageObj.$com.noticemsg.showMsg(newMsg, newMsg.getFromAccount(), selSess.unread())
        // nowPageObj.$invoke('showMsg', newMsg, newMsg.getFromAccount(), selSess.unread())
      } else if (newMsg.getFromAccount() !== selToID && path !== CHAT_ROOM) {
        // 其它销售发来的
        that.hasRead(selSess, false, false)
        // 弹窗提示
        // nowPageObj.$com.noticemsg.showMsg(newMsg, newMsg.getFromAccount(), selSess.unread())
        // nowPageObj.$invoke('showMsg', newMsg, newMsg.getFromAccount(), selSess.unread())
        // 名片夹图标显示提示
        if (path === CARD_DETAIL) {
          nowPageObj.showMsgFromAnother(true)
        }
      } else {
        that.hasRead(selSess, false, false)
        // 记录未读数量
      }
    }
  }
  // 监听新消息(直播聊天室)事件，直播场景下必填
  const onBigGroupMsgNotify = (res) => {}
  // 监听（多终端同步）群系统消息事件，如果不需要监听，可不填
  const onGroupSystemNotifys = (res) => {}
  // 监听群资料变化事件，选填
  const onGroupInfoChangeNotify = (res) => {}
  // 监听好友系统通知事件，选填
  const onFriendSystemNotifys = (res) => {}
  // 监听资料系统（自己或好友）通知事件，选填
  const onProfileSystemNotifys = (res) => {}
  // 被其他登录实例踢下线
  const onKickedEventCall = (res) => {}
  // 监听 C2C 系统消息通道
  const onC2cEventNotifys = (res) => {
    WebIM.Log.error('监听 C2C 系统消息通道', res)
  }
  return {
    "onConnNotify": onConnNotify,
    "jsonpCallback": jsonpCallback,
    "onMsgNotify": onMsgNotify,
    "onBigGroupMsgNotify": onBigGroupMsgNotify,
    "onGroupSystemNotifys": onGroupSystemNotifys,
    "onGroupInfoChangeNotify": onGroupInfoChangeNotify,
    "onFriendSystemNotifys": onFriendSystemNotifys,
    "onProfileSystemNotifys": onProfileSystemNotifys,
    "onKickedEventCall": onKickedEventCall,
    "onC2cEventNotifys": onC2cEventNotifys
  }
}

module.exports = webIMConnListen
