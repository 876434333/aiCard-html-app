/**
* 朋友圈换行转译
*/
const momentContChange = function(strContent) {
  return strContent.replace(/<br\/>/g, '\n')
}

module.exports = momentContChange