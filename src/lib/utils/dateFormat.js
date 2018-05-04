/**
 * 时间格式处理 dateFormat(new Date(1439887497484), "yyyy-MM-dd HH:mm:ss")
 * @param fmt
 * @returns {*}
 * @constructor
 */
export const dateFormat = (date, fmt) => {
    const dateObj = new Date(date);
    var o = {
        "M+": dateObj.getMonth() + 1, //月份
        "d+": dateObj.getDate(), //日
        "H+": dateObj.getHours(), //24小时
        "h+": dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours(), //12小时
        "m+": dateObj.getMinutes(), //分
        "s+": dateObj.getSeconds(), //秒
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
        "S": dateObj.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export const dateParse = (fmt) => {
    if (fmt.indexOf('-') > -1) {
        let _arr = fmt.split('-')
        return new Date(_arr[0], parseInt(_arr[1]) - 1, _arr[2])
    }
    return new Date()
}

//计算多少天数的日期范围  by fguo
export const dateSeven = (dayNumber) => {
  var myDate = new Date(); 
  myDate.setDate(myDate.getDate() - dayNumber);
  var dateArray = [];
  var dateTemp;
  var flag = 1;
  for (var i = 0; i < dayNumber+1; i++) {
    let getM = myDate.getMonth()+1;
    dateTemp = myDate.getFullYear()+"-"+(getM < 10 ? ('0'+ getM) : getM)+"-"+ (myDate.getDate() < 10 ? ('0' + myDate.getDate()) : myDate.getDate());
    dateArray.push(dateTemp);
    myDate.setDate(myDate.getDate() + flag);
  }
  return dateArray;
}

