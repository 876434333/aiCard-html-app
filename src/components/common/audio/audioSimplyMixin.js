import wepy from 'wepy'

export default class audioSimplyMixin extends wepy.mixin {
  data = {
    audio: null,
    canPlay: false,
    startStatus: false,
    pausedStatuts: true,
    timer: null,
    time: {
      currentPosition: '00:00',
      duration: '00:00'
    },
    timestamp: {
      now: 0,
      total: 0
    },
    progress: 0,
    width: {
      max: 0,
      current: 0
    }
  }
  methods = {
    tapPlay() {
      if (!this.audio || !this.canPlay) {
        return
      }
      if (this.pausedStatuts) {
        this.play()
      } else {
        this.pause()
      }
    }
  }
  /**
   * 设置进度条长度
   * @param {[type]} progress [description]
   */
  setLength(progress) {
    this.width.current = Math.floor(this.width.max * progress / 100)
    this.$apply()
  }
  /**
   * 创建音频
   * @param  {} src 音频路径
   */
  create(src) {
    let audio = wepy.createInnerAudioContext()
    audio.src = src
    audio.onEnded(() => {
      this.isEnded()
    })
    audio.onCanplay(() => {
      this.isCanplay()
    })
    this.audio = audio
  }
  /**
   * 音频播放
   */
  play() {
    if (!this.startStatus) {
      this.startStatus = true
    }
    this.pausedStatuts = false
    this.audio.play()
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.setDuration(this)
      }, 1000)
    }
  }
  /**
   * 暂停
   */
  pause() {
    this.audio.pause()
    clearInterval(this.timer)
    this.timer = null
    this.pausedStatuts = true
  }
  /**
   * 时间
   */
  setDuration() {
    // let currentTime = this.audio.currentTime
    this.timestamp.now++
    this.time.currentPosition = this.stotime(this.timestamp.now)
    let duration = this.stotime(this.audio.duration || this.timestamp.total)
    // console.log('setDuration', this.audio.currentTime, this.audio.duration)
    // console.log('setDuration-02', this.time.currentPosition, this.time.duration)
    // 更新时间
    this.time.duration = duration
    // this.timestamp.total = this.audio.duration
    if (this.timestamp.total >= this.timestamp.now) {
      // 更新进度条
      this.progress = Math.floor(this.timestamp.now * 100 / Math.floor(this.audio.duration || this.timestamp.total))
      this.setLength(this.progress)
      this.$apply()
    }
  }
  /**
   * 时间处理/显示
   * @param  {[type]} s 时间戳/秒
   */
  stotime = function(s) {
    let t = ''
    if (s > -1) {
      // let hour = Math.floor(s / 3600)
      let min = Math.floor(s / 60) % 60
      let sec = Math.floor(s % 60)
      // if (hour < 10) {
      //   t = '0' + hour + ":"
      // } else {
      //   t = hour + ":"
      // }
      if (min < 10) { t += '0' }
      t += min + ':'
      if (sec < 10) { t += '0' }
      t += sec
    }
    return t
  }
  /**
   * 音频进入可以播放状态，但不保证后面可以流畅播放
   */
  isCanplay() {
    this.canPlay = true
  }
  /**
   * 音频自然播放结束事件
   * @return {[type]} [description]
   */
  isEnded() {
    // 清除定时器
    clearInterval(this.timer)
    this.timer = null
    // 重置为未播放
    this.startStatus = false
    this.pausedStatuts = true
    // 重置进度条
    this.progress = 0
    this.setLength(this.progress)
    // 显示事件
    this.time.currentPosition = '00:00'
    this.timestamp.now = 0
    // 停止/重置时间
    // this.audio.play()
    // this.audio.stop()
    // this.audio.seek({
    //   position: 0
    // })
    // this.audio.seek(0)
    // console.log('onEnded', this.audio.currentTime)
    this.$apply()
  }
  /**
   * 销毁当前实例
   */
  destroy() {
    if (!this.audio) {
      return
    }
    this.audio.destroy()
  }
}