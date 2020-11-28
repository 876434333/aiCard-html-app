
/**
 * 休眠
 * @param  {[type]} numberMillis 毫秒数
 */
export const sleep = function(numberMillis) {
  var now = new Date()
  var exitTime = now.getTime() + numberMillis
  while (true) {
    now = new Date()
    if (now.getTime() > exitTime) {
      return
    }
  }
}
