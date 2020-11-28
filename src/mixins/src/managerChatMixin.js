import wepy from 'wepy'
import webim from '../../assets/js/webIM/sdk/webim'
import {chatApi} from '@/api'
import {setMineAccountSession, getMineAccountSession, setMsgListBlue, setUnreadMsgBlue, getFriendChatInfoBlue, setFriendChatInfoBlue, setTotalUnreadMsgBlue} from '@/storage/src/cardDetail'
import { formatDate } from '../../utils/src/date.js'
export default class managerChatMixin extends wepy.mixin {
  data = {
    selType: webim.SESSION_TYPE.C2C, // 当前聊天类型
    loginInfo: {},
    recentCache: [],
    messageList: [],
    unreadMsgObj: {},
    firendId: '',
    totalUnreadMsg: '',
    chatList: []
  }
  initChat(that) {
    var identifier
    var userSig
    var identifierNick
    // var myHeadIcon
    // var myName
    setFriendChatInfoBlue('')
    new Promise(function (resolve, reject) {
      chatApi.getIMParams().then((data) => {
        var result = data
        identifier = result.id
        userSig = result.userSig
        identifierNick = result.name
        // myHeadIcon = result.head_icon
        // myName = result.name
        setMineAccountSession({ // 存入本地
          account: result.id,
          nickName: result.name,
          avtor: result.head_icon
        })
        resolve(result)
      })
    }).then((result) => {
      var sdkAppID = result.sdk_app_id
      var accountType = result.acount_type
      var recentOptions = {
        'Count': 30 // 要拉取的最近会话条数
      }
      // 当前用户身份
      let loginInfo = {
        'sdkAppID': sdkAppID, // 用户所属应用id,必填
        'identifier': identifier, // 当前用户ID,必须是否字符串类型，必填
        'accountType': accountType, // 用户所属应用帐号类型，必填
        'userSig': userSig, // 当前用户身份凭证，必须是字符串类型，必填
        'identifierNick': identifierNick, // 当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
        'headurl': '' // 当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
      }
      var onConnNotify = function (resp) {
        var info
        switch (resp.ErrorCode) {
          case webim.CONNECTION_STATUS.ON:
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo)
            break
          case webim.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo
            webim.Log.warn(info)
            break
          case webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo
            webim.Log.warn(info)
            break
          default:
            webim.Log.error('未知连接状态: =' + resp.ErrorInfo)
            break
        }
      }

      var onMsgListNotify = function (newMsgList) {
        /**
         *
         * 1、获取历史联系人信息
        */
        webim.getRecentContactList(
          recentOptions,
          function (resp) {
            new Promise(function (resolve, reject) {
              if (that.recentCache.length > 0) {
                that.messageList = that.recentCache
                resolve()
              } else {
                var tempArray = []
                if (resp.SessionItem) {
                  for (let i = 0; i < resp.SessionItem.length; i++) {
                    tempArray.push(resp.SessionItem[i].To_Account)
                  }
                }
                chatApi.getMsgListPromise(tempArray).then((res) => {
                  var result = res
                  if (resp.SessionItem) {
                    for (let i = 0; i < resp.SessionItem.length; i++) {
                      for (let j = 0; j < result.length; j++) {
                        if (resp.SessionItem[i].To_Account === result[j].id) {
                          var sess = Object.assign({}, resp.SessionItem[i], result[j])
                          that.messageList.push({
                            account: sess.To_Account,
                            head_icon: sess.head_icon,
                            name: that.convertFaceMsgToHtml(sess.nick_name),
                            msg: that.convertFaceMsgToHtml(sess.MsgShow),
                            time: that.formatDateTime(sess.MsgTimeStamp * 1000)
                          })
                        }
                      }
                    }
                  }
                  that.recentCache = that.messageList
                  setMsgListBlue(that.messageList)
                  resolve()
                })
              }
            }).then(() => {
              /**
              * 2、遍历新消息
              */
              let newMsg
              let tempNewMsgArray = []
              for (let j in newMsgList) {
                newMsg = newMsgList[j]
                /*
                * messageAi页面添加消息
                */
                let isRecentContact = that.messageList.find((o, i) => {
                  return o.account === newMsg.fromAccount
                })
                if (isRecentContact) { // 是历史联系人
                  for (let i = 0; i < that.messageList.length; i++) {
                    if (that.messageList[i].account === isRecentContact.account) {
                      that.messageList[i].msg = that.convertFaceMsgToHtml(newMsg.elems[0].content.text)
                      let recentMsg = that.messageList[i]
                      // 移动到第一个
                      that.messageList.splice(i, 1)
                      that.messageList.unshift(recentMsg)
                    }
                  }
                } else { // 不是历史联系人
                  tempNewMsgArray.push(newMsg.fromAccount)
                }

                /*
                * 获取sentMessage面板对方的消息
                */
                let accountMsg = getMineAccountSession()
                chatApi.getMsgListPromise([newMsg.fromAccount]).then((res) => {
                  let sess = Object.assign({}, newMsg, res[0])
                  if (sess.fromAccount === accountMsg.account) {
                    that.chatList.push({
                      account: sess.fromAccount,
                      headIcon: sess.head_icon,
                      name: sess.nickName,
                      msg: that.convertFaceMsgToHtml(sess.elems[0].content.text),
                      time: that.formatDateTime(sess.time * 1000),
                      status: 'left'
                    })
                  }
                })
              }

              that.recentCache = that.messageList
              chatApi.getMsgListPromise(tempNewMsgArray).then((res) => {
                var result = res
                newMsgList.forEach((o, i) => {
                  result.forEach((m, j) => {
                    if (o.fromAccount === m.id) {
                      var sess = Object.assign({}, o, m)
                      that.messageList.unshift({
                        account: sess.fromAccount,
                        head_icon: sess.head_icon,
                        name: that.convertFaceMsgToHtml(sess.nickName),
                        msg: that.convertFaceMsgToHtml(sess.elems[0].content.text),
                        time: that.formatDateTime(sess.time * 1000)
                      })
                    }
                  })
                })
                that.recentCache = that.messageList
                setMsgListBlue(that.messageList)
                // 刷新消息列表
                var pages = getCurrentPages() // 获取加载的页面
                var currentPage = pages[pages.length - 1] // 获取当前页面的对象
                var url = currentPage.route // 当前页面url
                if (url === 'pages/chat/msgList') {
                  var msgListPage = that.$parent.getMsgListPage()
                  msgListPage.$wxpage.refreshList()
                }
              })
            })
            setMsgListBlue(that.messageList)
            /**
            * 3、获取未读信息
            */
            getUnreadMsg(newMsgList)
          },
          function (error) {
            console.log(error)
          }
        )
      }

      function getUnreadMsg(newMsgList) { // 获取未读信息
        var sessMap = webim.MsgStore.sessMap()
        let firend = getFriendChatInfoBlue()
        let firendId = ''
        if (firend) {
          firendId = firend.name
        }
        setTotalUnreadMsgBlue(0)
        that.totalUnreadMsg = 0
        var totalUnreadMsg = 0
        for (var i in sessMap) {
          totalUnreadMsg += sessMap[i]._impl.unread
          that.totalUnreadMsg += sessMap[i]._impl.unread
          that.unreadMsgObj[sessMap[i]._impl.id] = sessMap[i]._impl.unread
        }
        setTotalUnreadMsgBlue(totalUnreadMsg)
        for (let i = 0; i < newMsgList.length; i++) {
          if (newMsgList[i].fromAccount === firendId) {
            var page = that.$parent.getchatPage()
            page.receiveMsg(newMsgList[i], newMsgList[i].subType, 0)
            break
          }
        }
        setUnreadMsgBlue(that.unreadMsgObj)
        that.$apply()
      }

      var onKickedEventCall = function () {
        webim.Log.error('其他地方登录，被T了')
      }

      var listeners = {
        'onConnNotify': onConnNotify,
        'onMsgNotify': onMsgListNotify,
        'onKickedEventCall': onKickedEventCall
      }
      var options = { // 初始化时，其他对象，选填
        'isAccessFormalEnv': true,  // 是否访问正式环境，默认访问正式，选填
        'isLogOn': false // 是否开启控制台打印日志,默认开启，选填
      }
      // 登入
      webim.login(
        loginInfo, listeners, options,
        function (resp) {
          // 获取未读 C2C 消息
          webim.syncMsgs(listeners.onMsgNotify)
        },
        function (err) {
          console.info(err)
        }
      )
    })
  }
  /*
  * 解析表情消息元素
  */
  convertFaceMsgToHtml(content) {
    var Emoji = {
      map: {
        '[):]': 'ee_1.png',
        '[:D]': 'ee_2.png',
        '[;)]': 'ee_3.png',
        '[:-o]': 'ee_4.png',
        '[:p]': 'ee_5.png',
        '[(H)]': 'ee_6.png',
        '[:@]': 'ee_7.png',
        '[:s]': 'ee_8.png',
        '[:$]': 'ee_9.png',
        '[:(]': 'ee_10.png',
        '[:\'(]': 'ee_11.png',
        '[:|]': 'ee_18.png',
        '[(a)]': 'ee_13.png',
        '[8o|]': 'ee_14.png',
        '[8-|]': 'ee_15.png',
        '[+o(]': 'ee_16.png',
        '[<o)]': 'ee_12.png',
        '[|-)]': 'ee_17.png',
        '[*-)]': 'ee_19.png',
        '[:-#]': 'ee_20.png',
        '[:-*]': 'ee_22.png',
        '[^o)]': 'ee_21.png',
        '[8-)]': 'ee_23.png',
        '[(|)]': 'ee_24.png',
        '[(u)]': 'ee_25.png',
        '[(S)]': 'ee_26.png',
        '[(*)]': 'ee_27.png',
        '[(#)]': 'ee_28.png',
        '[(R)]': 'ee_29.png',
        '[({)]': 'ee_30.png',
        '[(})]': 'ee_31.png',
        '[(k)]': 'ee_32.png',
        '[(F)]': 'ee_33.png',
        '[(W)]': 'ee_34.png',
        '[(D)]': 'ee_35.png'
      }
    }
    try {
      var decodeContent = JSON.parse(decodeURI(content))
    } catch (error) {

    } finally {
      if (Object.prototype.toString.call(decodeContent) === '[object Object]') {
        let decodeType = decodeContent.MsgType
        if (decodeType === 'image') {
          return '[图片]'
        }
      } else {
        if (content) {
          var obj = new Object()
          obj = Emoji.map
          var newStr = content
          var str
          var array = newStr.split(/(\[[^[\]]+\])/)
          for (var i in obj) {
            for (var temp = 0; temp < array.length - 1; temp++) {
              if (decodeURI(array[temp]) === i) {
                array[temp] = '...'
              }
            }
          }
          str = array.join('')
          return str
        }
      }
    }
  }
  /**
   * 格式化时间戳
   */
  formatDateTime(time) {
    return formatDate(time)
  }
}
