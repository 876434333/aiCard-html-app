var WebIM = require('./sdk/webim.js')
var emoji = require('./emoji.js')

WebIM.EmojiObj = emoji.EmojiObj

WebIM.Emoji = emoji.Emoji

WebIM.parseEmoji = (msg) => {
  if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
    return msg
  } else {
    msg = msg.replace(/&lt;/g, '<')
    var emoji = WebIM.Emoji, reg = null
    var msgList = []
    var objList = []
    for (var face in emoji.map) {
      if (emoji.map.hasOwnProperty(face)) {
        while (msg.indexOf(face) > -1) {
          msg = msg.replace(face, "^" + emoji.map[face] + "^")
        }
      }
    }

    var ary = msg.split('^')
    var reg = /^e.*g$/
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] != '') {
        msgList.push(ary[i])
      }
    }
    for (var i = 0; i < msgList.length; i++) {
      if (reg.test(msgList[i])) {
        var obj = {}
        obj['data'] = msgList[i]
        obj['type'] = 'emoji'
        objList.push(obj)
      } else {
        var obj = {}
        obj['data'] = msgList[i]
        obj['type'] = 'txt'
        objList.push(obj)
      }
    }
    return objList
  }
}

WebIM.parseEmojiSimply = (msg) => {
  if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
    return msg
  } else {
    msg = msg.replace(/&lt;/g, '<')
    var emoji = WebIM.Emoji, reg = null
    var msgList = []
    var objList = []
    for (var face in emoji.map) {
      if (emoji.map.hasOwnProperty(face)) {
        while (msg.indexOf(face) > -1) {
          msg = msg.replace(face, "^" + emoji.map[face] + "^")
        }
      }
    }

    var ary = msg.split('^')
    var reg = /^e.*g$/
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] != '') {
        msgList.push(ary[i])
      }
    }
    for (var i = 0; i < msgList.length; i++) {
      if (reg.test(msgList[i])) {
        var obj = {}
        obj['data'] = '[表情]'
        obj['type'] = 'emoji'
        objList.push(obj)
      } else {
        var obj = {}
        obj['data'] = msgList[i]
        obj['type'] = 'txt'
        objList.push(obj)
      }
    }
    return objList
  }
}

module.exports = WebIM