import wepy from 'wepy'
import echarts from '@/components/echarts/js/echarts.js'
export default class lineMixin extends wepy.mixin {
  data = {
    lineChart: null
  }
  line(canvasId, lineData, e) {
    var windowWidth = 320
    try {
      var res = wepy.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    this.lineChart = new echarts({
      canvasId: canvasId,
      type: 'line',
      categories: lineData.categories,
      animation: true,
      series: lineData.series,
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '',
        format(val) {
          return val.toFixed(2)
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    })
  }
  methods = {
    // touchHandler(e) {
    //   this.lineChart.showToolTip(e, {
    //     format: function (item, category) {
    //       return category + ' ' + item.name + ':' + item.data
    //     }
    //   })
    // }
  }
}