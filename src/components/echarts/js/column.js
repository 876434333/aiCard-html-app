import wepy from 'wepy'
import echarts from '@/components/echarts/js/echarts.js'
export default class columnMixin extends wepy.mixin {
  data = {
    columnChart: null
  }
  column(canvasId, columnData, e) {
    var windowWidth = 320
    try {
      var res = wepy.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    this.columnChart = new echarts({
      canvasId: canvasId,
      type: 'column',
      animation: true,
      categories: columnData.main.categories,
      series: columnData.main.series,
      yAxis: {
        format(val) {
          return val
        },
        min: 0,
        gridColor: '#d5d5d5',
        fontColor: '#323232'
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration',
        gridColor: '#d5d5d5',
        fontColor: '#323232'
      },
      extra: {
        column: {
          width: 15
        },
        legendTextColor: '#323232'
      },
      width: windowWidth,
      height: 200
    })
  }
}
