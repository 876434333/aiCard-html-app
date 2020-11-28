export const tabBarJs = {
  tabBarObject: {
    color: '#909090',
    selectedColor: '#ff7f02',
    backgroundColor: "#ffffff",
    borderStyle: "#ddd",
    list: [{
        pagePath: "/pages/card/cardView",
        text: "名片",
        iconPath: "/assets/images/bar_kmp_mp_2.png",
        selectedIconPath: "/assets/images/bar_kmp_mp_1.png",
        selected: false
      },
      {
        pagePath: "/pages/product/shopProduct?operate=view",
        text: "产品",
        iconPath: "/assets/images/bar_kmp_sc_2.png",
        selectedIconPath: "/assets/images/bar_kmp_sc_1.png",
        selected: false
      },
      {
        pagePath: '/pages/home/homeIndex',
        text: '名片夹',
        iconPath: '/assets/images/bar_card_holder_2.png',
        selectedIconPath: '/assets/images/bar_card_holder_1.png',
        selected: false
      },
      {
        pagePath: "/pages/moment/momentView",
        text: "动态",
        iconPath: "/assets/images/bar_kmp_dt_2.png",
        selectedIconPath: "/assets/images/bar_kmp_dt_1.png",
        selected: false
      },
      {
        pagePath: "/pages/website/websiteView",
        text: "官网",
        iconPath: "/assets/images/bar_kmp_gw_2.png",
        selectedIconPath: "/assets/images/bar_kmp_gw_1.png",
        selected: false
      }
    ],
    position: "bottom"
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
    // console.log(this.tabBarObject)
    e.$apply();
    return this.tabBarObject;
  }
}
