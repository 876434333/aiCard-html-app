/**
* 简介换行
*/
const escToSpecial = function(strContent) {
  return strContent.replace(/&#10;/g, '\r\n')
}

module.exports = escToSpecial