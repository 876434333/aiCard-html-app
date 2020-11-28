/**
 * 特殊格式数据转为字符串
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const changeObjToTxt = function (obj) {
  let res = encodeURI(JSON.stringify(obj))
  return res
}
/**
 * 字符串庄毅为特殊格式数据
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const changeTxtToObject = function (txt) {
  let res = JSON.parse(decodeURI(str))
  return res
}
