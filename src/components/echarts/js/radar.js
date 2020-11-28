import wepy from 'wepy'
import echarts from '@/components/echarts/js/echarts.js'
export default class radarMixin extends wepy.mixin {
  data = {
    radarChart: null
  }
  radar(canvasId, categories, radarData, e) {
    var windowWidth = 345
    try {
      var res = wepy.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    let height = 200
    if (canvasId === 'radarCanvas0') {
      categories = ['获客能力值', '产品推广值', '官网推广值', '客户互动值', '销售主动值', '个人魅力值']
    } else {
      windowWidth = 165
      height = 170
    }
    this.radarChart = new echarts({
      canvasId: canvasId,
      type: 'radar',
      categories: categories,
      series: [{
        name: '雷达能力图',
        data: radarData,
        color: '#5077aa'
      }],
      width: windowWidth,
      height: height,
      extra: {
        radar: {
          max: 150
        }
      }
    })
  }
}

