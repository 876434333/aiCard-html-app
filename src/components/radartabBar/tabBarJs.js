export const tabBarJs = {
  tabBarObject: {
    color: '#909090',
    selectedColor: '#e75152',
    backgroundColor: '#ffffff',
    borderStyle: '#ddd',
    list: [{
      pagePath: '/pages/aiRadar/radarIndex',
      text: '雷达',
      iconPath: '/assets/images/bar_ld_1.png',
      selectedIconPath: '/assets/images/bar_ld_2.png',
      selected: false
    },
    {
      pagePath: '/pages/chat/msgList?page=radar',
      text: '消息',
      iconPath: '/assets/images/bar_msg_1.png',
      selectedIconPath: '/assets/images/bar_msg_2.png',
      selected: false
    },
    {
      pagePath: '/pages/aiRadar/clientIndex',
      text: '客户',
      iconPath: '/assets/images/bar_client_1.png',
      selectedIconPath: '/assets/images/bar_client_2.png',
      selected: false
    }],
    position: 'bottom'
  },
  selected: function (i, e) {
    let barList = this.tabBarObject.list;
    barList.forEach((item, index) => {
      if (i == index) {
        barList[index].selected = true;
      } else {
        barList[index].selected = false;
      }
    })
    e.$apply();
    return this.tabBarObject;
  }
}
