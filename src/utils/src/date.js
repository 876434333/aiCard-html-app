/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
const formatDate = (date, fmt) => {
  date = date == undefined ? new Date() : date;
  date = typeof date == 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  var obj =
  {
    'y': date.getFullYear(), // 年份，注意必须用getFullYear
    'M': date.getMonth() + 1, // 月份，注意是从0-11
    'd': date.getDate(), // 日期
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'w': date.getDay(), // 星期，注意是0-6
    'H': date.getHours(), // 24小时制
    'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
    'm': date.getMinutes(), // 分钟
    's': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  };
  var week = ['天', '一', '二', '三', '四', '五', '六'];
  for(var i in obj)
  {
    fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
    {
      var val = obj[i] + '';
      if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length == 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
}

const momentFormDate = (timeStamp, fmt, isScecnd) => {
  let now = new Date()
  let nowTimestamp = now.getTime()
  let dist
  if (isScecnd) {
    timeStamp = timeStamp * 1000
  }
  dist = (nowTimestamp - timeStamp) / 1000 / 3600
  if (dist < 1) {
    dist = (nowTimestamp - timeStamp) / 1000 / 60 
    return Math.ceil(dist) + '分钟前'
  } else if (dist >= 1 && dist < 24) {
    return Math.floor(dist) + '小时前'
  } else if(dist >= 24) {
    let date = new Date(timeStamp)
    return formatDate(date, fmt || 'yyyy-MM-dd HH:mm')
  }
}

const getRemainingTime = (createTimestamp, overTime) => {
  let nowTime = new Date()
  // 当前时间
  let nowTimestamp = (nowTime.getTime() / 1000)
  // 失效时间
  let endTimestamp = parseInt((createTimestamp / 1000) + overTime)
  // 剩余时间
  let remainingTime = parseInt(endTimestamp - nowTimestamp)
  // 将剩余时间转化成小时/分钟
  if (remainingTime === 0) {
    return '0'
  }
  // 小时
  let remainingHour = Math.floor(remainingTime / 3600)
  if (remainingHour > 1) {
    return remainingHour + '小时'
  }
  // 分钟
  let remainingMinute = Math.floor(remainingTime % 60)
  if (remainingMinute > 1) {
    return remainingMinute + '分钟'
  } else {
    return '1分钟'
  }
}
export {
  formatDate,
  momentFormDate,
  getRemainingTime
}