/**
 * 根据字节数,转换成可阅读性的存储单位
 * @param  {Number} size 字节数
 * @param  {Number} fixed 保留的小数位数(默认为2位)
 * @return {String} 
 */
const prettysize = function (size, fixed = 2) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(fixed) + ' TB';
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(fixed) + ' GB';
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(fixed) + ' MB';
  } else if (size > 1024) {
    return (size / 1024).toFixed(fixed) + ' KB';
  }
  return size.toString() + ' B';
}

module.exports = prettysize