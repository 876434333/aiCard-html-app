import wepy from 'wepy'

// 缓存本次的名片信息
export const putCardDetail = function (sellerId, cardDetail) {
  return wepy.setStorage({
    key: sellerId + '-cardDetail',
    data: cardDetail
  })
}
// 获取上次缓存的名片信息
export const outCardDetail = function (sellerId) {
  let detail = wepy.getStorageSync(sellerId + '-cardDetail')
  return detail
}

// 保存管名片IM相关信息
export const setMineAccountSession = function (params) {
  return wepy.setStorage({
    key: 'mineAccountSession',
    data: params
  })
}
// 保存管名片IM相关信息
export const getMineAccountSession = function () {
  return wepy.getStorageSync('mineAccountSession')
}

// 保存朋友的IM账户信息--管名片/雷达
export const setFriendChatInfoBlue = function (friend){
  wepy.setStorage({
    key: 'friendChatInfoBlue',
    data: friend
  })
}
// 获取朋友的IM账户信息--管名片/雷达
export const getFriendChatInfoBlue = function () {
  return wepy.getStorageSync('friendChatInfoBlue')
}
// 保存消息列表--管名片/雷达
export const setMsgListBlue = function (msgList) {
  wepy.setStorage({
    key: 'msgList',
    data: msgList
  })
}
// 获取消息列表--管名片/雷达
export const getMsgListBlue = function () {
  return wepy.getStorageSync('msgList')
}
// 保存消息列表--管名片/雷达
export const setUnreadMsgBlue = function (unreadmsg) {
  wepy.setStorage({
    key: 'unreadmsg',
    data: unreadmsg
  })
}
// 获取消息列表--管名片/雷达
export const getUnreadMsgBlue = function () {
  return wepy.getStorageSync('unreadmsg')
}
// 保存总的未读消息数--管名片/雷达
export const setTotalUnreadMsgBlue = function (totalunreadmsg) {
  wepy.setStorage({
    key: 'totalunreadmsg',
    data: totalunreadmsg
  })
}
// 获取保存总的未读消息数--管名片/雷达
export const getTotalUnreadMsgBlue = function () {
  return wepy.getStorageSync('totalunreadmsg')
}
