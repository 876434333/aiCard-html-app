import wepy from 'wepy'

export default class indexMixin extends wepy.mixin {
  data = {
    params: {
      pageNum: 1,
      pageSize: 10
    },
    page: {
      totalNum: 0
    },
    table: {
      columns: [],
      list: [],
      selection: []
    },
    // 回复输入框等
    form: {
      show: false,
      entity: {
        id: ''
      }
    },
    detail: {
      show: false,
      entity: {
        id: ''
      }
    },
    isLoading: false,
    isNoMore: false,
    isNonthing: false
  }

  // 下拉触底
  onPullDownRefresh() {
    this.params.pageNum = 1
    this.showList(1)
  }

  // 上拉触底
  onReachBottom() {
    this.showList(this.params.pageNum + 1)
  }

  /**
   * 初始化服务端数据
   * @param {any} resolve Promise.resolve
   * @param {any} reject Promise.reject
   */
  initData(resolve, reject) {
    resolve()
  }

  /**
   * 初始化构造
   */
  init() {
    this.initValidate()
    this.initReady()
    this.search()
  }
  /**
   * 初始化表单验证
   */
  initValidate() {}
  /**
   * 初始化完成ready
   */
  initReady() {}
  /**
   * 提供service
   */
  getApi() {
  }
  /**
   * 查询前执行，可更改查看参数
   * @param {any} params
   */
  beforeList(params) {}
  /**
   * 查询成功后执行，可更改list
   * @param {any} page
   */
  afterList(page) {
  }
  /**
   * 删除成功后执行
   */
  afterDel() {
    this.list()
  }
  /**
   * 更新数据成功后执行
   * @param {any} data
   * @param {any} label
   */
  afterUpdateData(data, label) {
    this.list()
  }
  /**
   * 查询列表数据
   * @param {any} pageNum
   * @param {any} pageSize
   */
  list(pageNum, pageSize) {
  }
  /**
   * 获得列表数据后，设置页面数据
   * @param {any} pageNum
   * @param {any} pageSize
   */
  listAndSetPage(pageNum, pageSize) {
    this.beforeList(this.params.pageNum)
    return this.list(pageNum, pageSize).then((page) => {
      this.afterList(page)
      this.setTableList(page)
      this.setPagination(page)
      this.setPageNumSize(pageNum, pageSize, page.data_list.length)
      return page
    })
  }
  /**
   * 查询列表第一页
   */
  search(pageNum = 1) {
    this.table.selection = []
    this.params.pageNum = pageNum
    this.showList(pageNum)
  }
  /**
   * 显示并默认选择某个选项
   * @param  {[type]} index 被选中元素的数组下标
   */
  showList(index) {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    return this.listAndSetPage(this.params.pageNum, this.params.pageSize).then((page) => {
      // 判断新数据
      let list = this.table.list
      this.isLoading = false
      if (index === 1 && page.data_list.length > 0) {
        // 第一页，数据不为0
        this.table.list = page.data_list
        this.isNoMore = false
        this.isNonthing = false
      } else if (index === 1 && page.data_list.length === 0) {
        // 第一页，数据为0
        this.isNonthing = true
        this.table.list = []
      } else if (page.data_list.length === 0 && index > 1) {
        // 非第一页，数据为0
        this.isNoMore = true
        setTimeout(() => {
          this.isNoMore = false
          this.$apply()
        }, 3000)
      } else if (page.data_list.length > 0 && index > 1) {
        // 非第一页，数据不为0
        page.data_list.some(v => {
          list.push(v)
        })
        this.table.list = list
      }
      this.$apply()
      this.afterSetListAndPage()
    }, () => {})
  }
  /**
   * 设置页码和每页数量
   * @param {[type]} pageNum  页码
   * @param {[type]} pageSize 每页数量
   */
  setPageNumSize(pageNum, pageSize, length) {
    if (pageNum === 1) {
      wepy.stopPullDownRefresh()
    }
    if (!isNaN(+pageNum) && length > 0) {
      this.params.pageNum += 1
    }
    if (!isNaN(+pageSize)) {
      this.params.pageSize = +pageSize
    }
  }
  /**
   * 设置列表数据
   */
  setTableList() {
    // if (this.table.selection.length) {
    //   let section = this.table.selection
    //   let map = {}
    //   list.forEach(v => {
    //     map[v.id] = v
    //   })
    //   // 支持翻页后选中状态保持
    //   for (let i = 0, l = section.length; i < l; i++) {
    //     let v = section[i]
    //     if (map[v.id]) {
    //       section.splice(i, 1, map[v.id])
    //       map[v.id]._checked = true
    //     }
    //   }
    // }
    // this.table.list = list
  }
  /**
   * 设置分页
   * @param {any} page
   */
  setPagination(page) {
    this.page.totalNum = page.totalNum
  }
  /**
   * 显示完列表/页码数据后，可以做一些全局统计
   */
  afterSetListAndPage() {}
  /**
   * 显示删除
   * @param {any} id
   * @param {string} [content='删除操作不可恢复，确认继续删除?']
   */
  showDel(id, content = '删除操作不可恢复，确认继续删除?') {
    // this.$Modal.confirm({
    //   title: '确认删除',
    //   content,
    //   onOk: (action, instance) => {
    //     this.getApi().del(id).then(() => {
    //       this.afterDel()
    //     })
    //   }
    // })
  }
  /**
   * 更新数据
   * @param {any} data
   * @param {any} label
   */
  updateData(data, label) {
  }
  /**
   * 处理table的选中事件
   * @param {*} data
   */
  handleTableSelection(data) {
  }
  /**
   * 获取表格选中列的id数组
   * @returns
   */
  getTableSelection() {
  }
  /**
   * 批量删除
   */
  showBatchDel() {
  }
}
