import wepy from 'wepy'

export default class pageingMixin extends wepy.mixin {
  data = {
    // 分页请求参数
    params: {
      page_num: 1,
      page_size: 10
    },
    // 总数量
    totalNum: 0,
    // 没有更多数据
    noMore: false
  }

  init() {
    this.getDataList(this.params).then(res => {
      this.updataRequestParams(res.page_size, res.page_num, res.total_num)
    })
  }
  // 往前翻页(在页面有效)
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
    if (this.params.page_num === 1) {
      return
    }
    this.params.page_num -= 1
    this.getDataList(this.params).then(res => {
      this.updataRequestParams(res.page_size, res.page_num, res.total_num)
    })
  }

  // 往后翻页(在页面有效)
  onReachBottom() {
    if (this.noMore) {
      return
    }
    this.params.page_num += 1
    this.getDataList(this.params).then(res => {
      this.updataRequestParams(res.page_size, res.page_num, res.total_num)
    })
  }
  // 往前翻页(在组件有效)
  loadNewData() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
    if (this.params.page_num === 1) {
      return
    }
    this.params.page_num -= 1
    this.getDataList(this.params).then(res => {
      this.updataRequestParams(res.page_size, res.page_num, res.total_num)
    })
  }

  // 往后翻页(在组件有效)
  loadMoreData() {
    if (this.noMore) {
      return
    }
    this.params.page_num += 1
    this.getDataList(this.params).then(res => {
      this.updataRequestParams(res.page_size, res.page_num, res.total_num)
    })
  }
  // 加载数据
  getDataList(params) {}
  // 增加其他参数，在请求时添加
  addRequestParams(object) {
    for (var attribute in object) {
      this.params[attribute] = object[attribute]
    }
  }
  // 利用返回参数更新请求参数
  updataRequestParams(pageSize, pageNum, tatolNum) {
    this.totalNum = tatolNum
    let dataNum = pageSize * pageNum
    if (dataNum < tatolNum) {
      this.noMore = false
    } else {
      this.noMore = true
    }
    this.$apply()
  }
  // 重置分页请求参数
  resetRequestParams() {
    this.params.page_num = 1
    this.params.page_size = 10
  }
}
