import wepy from 'wepy'

export const WebComponent = {
  default: {
    id: '',
    type: null,
    textContent: {},
    config: ''
  },

  textContent: {
    'companyInfo': {
      oType: 1,
      type: 'companyInfo',
      alias: '企业简介',
      data: {
        title: {
          type: 'inputText',
          value: ''
        },
        textAlign: {
          type: 'inputRadio',
          props: 'align',
          value: 'left'
        },
        content: {
          type: 'inputTextarea',
          value: ''
        }
      }
    },
    'companyPhone': {
      oType: 2,
      type: 'companyPhone',
      alias: '公司电话',
      data: {
        title: {
          type: 'inputText',
          value: ''
        },
        textAlign: {
          type: 'inputRadio',
          props: 'align',
          value: 'left'
        },
        phone: {
          type: 'inputText',
          value: ''
          // rules: [{"trigger":"blur"}]
        }
      }
    },
    'companyAddress': {
      oType: 3,
      type: 'companyAddress',
      alias: '地址',
      data: {
        title: {
          type: 'inputText',
          value: ''
        },
        textAlign: {
          type: 'inputRadio',
          props: 'align',
          value: 'left'
        },
        address: {
          type: 'inputTextarea',
          value: ''
        }
      }
    },
    'contactUs': {
      oType: 4,
      type: 'contactUs',
      alias: '联系我们',
      data: {
        title: {
          type: 'inputText',
          value: ''
        },
        textAlign: {
          type: 'inputRadio',
          props: 'align',
          value: 'left'
        },
        employee: {
          type: 'inputEmployee',
          value: []
        }
      }
    },
    'baseTitle': {
      oType: 5,
      type: 'baseTitle',
      alias: '标题',
      data: {
        title: {
          type: 'inputText',
          value: ''
        },
        textAlign: {
          type: 'inputRadio',
          props: 'align',
          value: 'left'
        }
      }
    },
    'baseContent': {
      oType: 7,
      type: 'baseContent',
      alias: '内容',
      data: {
        content: {
          type: 'inputTextarea',
          value: ''
        }
      }
    },
    'poster': {
      oType: 7,
      type: 'poster',
      alias: '图片',
      data: {
        imageShowMode: {
          type: 'inputImageShowMode',
          value: {
            // 单图：single   滑块：marquee  三图：three
            mode: ''
          }
        },
        image: {
          type: 'inputImage',
          maxSize: 1,
          value: []
        }
      }
    },
    'swipe': {
      oType: 8,
      type: 'swipe',
      alias: '轮播图',
      data: {
        swipeStyle: {
          type: 'inputSwipeStyle',
          value: {}
        },
        image: {
          type: 'inputImage',
          maxSize: 9,
          value: []
        }
      }
    },
    'playVideo': {
      oType: 9,
      type: 'playVideo',
      alias: '视频',
      data: {
        // 视频链接
        video: {
          type: 'inputVideo',
          value: ''
        },
        // 视频封面
        image: {
          type: 'inputImage',
          maxSize: 1,
          value: []
        }
      }
    },
    'relative': {
      oType: 10,
      type: 'relative',
      alias: '占位',
      data: {
        style: {
          type: 'htmlStyle',
          title: '样式',
          value: {
            height: {
              type: 'inputNumber',
              value: ''
              // value: '90px'
            }
          }
        }
      }
    }
  },

  cloneObj(a) {
    return JSON.parse(JSON.stringify(a))
  },

  buildObj(type) {
    let obj = this.cloneObj(this.default)
    obj.textContent = this.cloneObj(this.textContent[type])
    obj.type = obj.textContent.oType
    delete obj.textContent.oType
    return obj
  },

  setDefData(type) {
    let obj = this.buildObj(type)
    if (type === 'baseTitle') {
      obj.textContent.data.title.value = '标题内容'
      obj.textContent = JSON.stringify(obj.textContent)
    }
    return obj
  },

  buildBaseTemplate() {
    let array = ['baseTitle']
    let rs = []
    for (let k in array) {
      rs.push(this.setDefData(array[k]))
    }
    return rs
  }
}
