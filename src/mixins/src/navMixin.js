import wepy from 'wepy'
import {
  SHOPPING_CART,
  PERSONAL_CENTER
} from '@/router'

export default class navMixin extends wepy.mixin {
  data = {
    nav: {
      showAllheightRpx: 290,
      showAllheight: null,
      showAll: false,
      enterName: '',
      newShopcart: false,
      newOrder: false
    },
    deviceWidth: null
  }
  methods = {
    /**
     * 前往个人中心
     */
    toPersonalCenter() {
      this.$navigate(PERSONAL_CENTER)
    },
    /**
     * 前往购物车
     */
    toShopcart() {
      this.$navigate(SHOPPING_CART)
    },
    toPageScroll(e) {
      this.pageScroll(e.detail.scrollTop)
    }
  }
  onLoad() {
    this.getShowNavHeight()
  }
  onShow() {
    this.setStatus()
  }
  /**
   * 监听用户滑动页面事件
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onPageScroll(e) {
    this.pageScroll(e.scrollTop)
  }
  pageScroll(scrollTop) {
    if (scrollTop >= this.nav.showAllheight && !this.nav.showAll) {
      this.nav.showAll = true
      this.$apply()
    } else if (scrollTop < this.nav.showAllheight && this.nav.showAll) {
      this.nav.showAll = false
      this.$apply()
    }
  }
  /**
   * 获取屏幕宽度px
   */
  getShowNavHeight() {
    if (this.deviceWidth) {
      return
    }
    let info = wepy.getSystemInfoSync()
    let deviceWidth = info.windowWidth
    this.nav.showAllheight = this.nav.showAllheightRpx * (deviceWidth / 750)
  }
  /**
   * 显示是否新增
   */
  setStatus() {
    let newShopcart = wepy.$instance.getNewShopCart(this.sellerId)
    if (newShopcart !== this.nav.newShopcart) {
      this.nav.newShopcart = newShopcart
    }
    let newOrder = wepy.$instance.getNewOrderAdd(this.sellerId)
    if (newOrder !== this.nav.newOrder) {
      this.nav.newOrder = newOrder
    }
    this.$apply()
  }
}
