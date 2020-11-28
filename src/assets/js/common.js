import wepy from 'wepy'

export const common = {

  // 模态窗口
  showModal(that, title, switchView, btns) {
    let t = this
    that.modal = {
      show: true,
      title: title,
      switch: switchView,
      btns: []
    }
    t.bind = function (btnName, btnMethod, color) {
      that.modal.btns.push({
        color: color,
        text: btnName,
        method: btnMethod
      })
      return t
    }
    return t
  },
  // 将秒转换为MM:SS
  getMMSS(duration) {
    let s = parseInt(duration / 1000)
    let h = Math.floor(s / 60)
    s = parseInt(s % 60)
    h += ''
    s += ''
    h = (h.length === 1) ? '0' + h : h
    s = (s.length === 1) ? '0' + s : s
    return h + ':' + s
  },
  globalData(that) {
    return that.$parent.globalData
  },
  getUserInfo(that) {
    return that.$parent.globalData.userInfo
  },
  getStaffInfo(that) {
    return that.$parent.globalData.staffInfo
  },
  getStaffId(that) {
    return that.$parent.globalData.staffInfo.staffId
  },
  getSalerInfo(that) {
    return that.$parent.globalData.curSellerInfo
  },
  getSalerId(that) {
    return that.$parent.globalData.curSellerInfo.staffId
  },
  getEnterpriseId(that) {
    return that.$parent.globalData.staffInfo.enterprise_id
  },
  getEnterpriseName(that) {
    return that.$parent.globalData.staffInfo.enterprise_name
  },
  getDepartmentId(that) {
    return that.$parent.globalData.departmentId
  },
  getOpenId(that) {
    return that.$parent.globalData.openid
  },
  getUUID() {
    let s = []
    let hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  },
  // 验证提示语
  tip(title, icon) {
    wepy.showToast({
      title: title,
      icon: icon,
      duration: 1000
    })
  },
  // 验证QQ邮箱格式
  emailTest(email, maskHidden) {
    // 5-12位数字，qq/Qq/qQ/QQ.com/cn
    let emailFormat = /^\d{5,12}@[qQ][qQ]\.(com|cn)$/
    if (email === '') {
      common.tip('请输入QQ邮箱', 'none')
      return false
    } else if (!email.match(emailFormat)) {
      common.tip('邮箱格式不正确', 'none')
      return false
    }
    maskHidden = true
    return maskHidden
  },
  // 保存画布
  saveCanvas(unit, w, h, canvasHidden, callback) {
    // common.albumSet()
    function canvasToTempFilePath() {
      wepy.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: unit * w,
        height: unit * h,
        destWidth: unit * w * 4,
        destHeight: unit * h * 4,
        canvasId: 'myCanvas',
        fileType: 'jpg'
      }).then((res) => {
        if (!res.tempFilePath) {
          common.tip('图片绘制中，请稍后重试')
        }
        wepy.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        }).then((res) => {
          common.tip('保存成功', 'success')
          canvasHidden = true
          callback(canvasHidden)
        })
      })
    }
    // 获取用户的当前设置
    wepy.getSetting().then((res) => {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 授权保存到系统相册
        wepy.authorize({
          scope: 'scope.writePhotosAlbum'
        }).then((res) => {
          canvasToTempFilePath()
        }, (fail) => {
          // 调起客户端小程序设置界面
          wepy.openSetting().then((res) => {
            canvasToTempFilePath()
          })
        })
      } else {
        canvasToTempFilePath()
      }
    })
  },
  // 下载图片
  download(url) {
    function downloadFile() {
      wepy.downloadFile({
        url: url
      }).then((res) => {
        if (res.statusCode === 200) {
          // 保存图片到系统相册
          wepy.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          }).then((res) => {
            common.tip('保存成功', 'success')
          })
        }
      })
    }
    // 获取用户的当前设置
    wepy.getSetting().then((res) => {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 授权保存到系统相册
        wepy.authorize({
          scope: 'scope.writePhotosAlbum'
        }).then((res) => {
          downloadFile()
        }, (fail) => {
          // 调起客户端小程序设置界面
          wepy.openSetting().then((res) => {
            downloadFile()
          })
        })
      } else {
        downloadFile()
      }
    })
  },
  // 拨打电话
  callPhone(phone) {
    if (phone) {
      wepy.makePhoneCall({
        phoneNumber: phone
      })
    }
  },
  // 预览图片
  previewImage(url) {
    wepy.previewImage({
      urls: [url]
    })
  },
  // 分组
  getGroupListByKey(res, key) {
    let getGroupNames = function getGroupNames(res, key) {
      let groupNames = []
      for (let i = 0; i < res.length; i++) {
        res[i][key] === null ? res[i][key] = '其他' : res[i][key] = res[i][key]
        if (groupNames.indexOf(res[i][key]) === -1) {
          groupNames.push(res[i][key])
        }
      }
      return groupNames
    }
    let groupNames = getGroupNames(res, key)
    let groupList = []
    for (let i = 0; i < groupNames.length; i++) {
      let groupName = groupNames[i]
      let dataList = []
      for (let j = 0; j < res.length; j++) {
        if (groupNames[i] === res[j][key]) {
          dataList.push(res[j])
        }
      }
      groupList.push({
        groupName: groupName,
        dataList: dataList
      })
    }
    // return groupList
    return common.getFirstLetterOrderList(groupList, key)
  },
  /**
   * 数组排序，针对上面的
   * @param {*} list
   * @param {*} key,比如时间，名字
   */
  getFirstLetterOrderList(list, key) {
    let resultList = list
    if (key === 'first_letter') {
      let tempKeyList = []
      resultList = []
      for (let i = 0; i < list.length; i++) {
        tempKeyList.push(list[i].groupName)
      }
      let resultKeyList = tempKeyList.sort()
      for (let i = 0; i < resultKeyList.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (resultKeyList[i] === list[j].groupName) {
            resultList.push(list[j])
            break
          }
        }
      }
    }
    return resultList
  },
  trim(str) {
    return str.replace(/^\s+|\s+$/gm, '');
  },
  isNull(key, tip) {
    if (key != null) {
      key = key = key + ''
    }
    if (key === null || key.trim() === '') {
      common.tip(tip, 'none')
      return false
    }
    return true
  },
  goPrevPage() {
    setTimeout(() => {
      wepy.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  isNumber(type, key, tip) {
    key = key + ''
    // 数字是整数
    if (type === 'integer') {
      if (!key.match(/^[0-9]*[1-9][0-9]*$/)) {
        common.tip(tip, 'none')
        return false
      }
    }
    // 数字是整数，可以是一位小数，也可以是两位小数
    if (type === 'float') {
      if (!key.match(/^\d+(?:\.\d{1,2})?$/)) {
        common.tip(tip, 'none')
        return false
      }
    }
    return true
  },
  clickAction(that, action_code, salerId) {
    that.$parent.recordClickAction({
      action_code: action_code,
      employee_id: typeof (salerId) === 'undefined' ? common.getSalerId(that) : salerId
    })
  },
  clickActionOffer(that, action_code, offerId, offerName, salerId) {
    that.$parent.recordClickAction({
      action_code: action_code,
      employee_id: typeof (salerId) === 'undefined' ? common.getSalerId(that) : salerId,
      offer_id: offerId,
      offer_name: offerName
    })
  },
  substr(str, start, end) {
    return str.substring(start, end)
  },
  // 将时间戳转化为字符串
  formatDateTime(shijianchuo) {
    // shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    return y + '-' + common.add0(m) + '-' + common.add0(d) + ' ' + common.add0(h) + ':' + common.add0(mm) + ':' + common.add0(s)
  },
  // 将时间戳转化为日期字符串
  formatDateTimeToDateString(shijianchuo) {
    // shijianchuo是整数，否则要parseInt转换
    if (!shijianchuo) {
      return ''
    }
    var time = new Date(shijianchuo)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    return y + '-' + common.add0(m) + '-' + common.add0(d)
  },
  // 补0
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  // 统计字数
  countTextNum(text) {
    return text.length
  }
}
