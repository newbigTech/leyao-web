/**
* Created by cycold on 2016-09-26
* 常用正则
*/

module.exports = {
  // 账户名/用户ID (字母、数字、下划线组成，字母开头，6-16位)
  userName: /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
  alphaNumberUnderline_StartByAlpha_limit_5_15: /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
  //金额
  amount:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,

  phoneOrMobile:/((\d{11})|^((\d{1,8})|(\d{4}|\d{3})-(\d{1,8})|(\d{4}|\d{3})-(\d{1,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{1,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,

  // 常用手机号码
  mobile: /(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/, 

  // 座机号码
  phoneNumber: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,

  // 邮件地址
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,

  // 只能输入数字
  numer: /^\d+$/,

  // 只能输入5位以上数字
  numer_min_5: /^\d{5,}$/,

  // 只能输入5位到16位数字
  number_limit_5_16: /^\d{5,16}$/,

  //数字和字母 (一般用于图片验证码)
  alphaNumber: /^[a-zA-Z0-9]{0,}$/,

  //年/月/日（年-月-日、年.月.日）
  date: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,

  // 中文字符
  chinese: /[\u4e00-\u9fa5]/,

  //中文、英文、数字及下划线
  alphaNumberChineseUnderline: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,

  //中文、英文、数字及下划线 但是只允许中文或者字母开头
  alphaNumberChineseUnderline_StartByChineseOrAlpha: /^([\u4e00-\u9fa5]|[a-zA-Z])([\u4e00-\u9fa5]|[a-zA-Z0-9_]){0,}$/,

  //中文、英文、数字及下划线 但是只允许中文或者字母开头 必须是4-16个字符
  alphaNumberChineseUnderline_StartByChineseOrAlpha_limit_4_16: /^([\u4e00-\u9fa5]|[a-zA-Z])([\u4e00-\u9fa5]|[a-zA-Z0-9_]){3,15}$/,

  //匹配身份证
  id: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  idNumber: /\d{15}|\d{18}/,

  //匹配首尾空白字符的正则表达式
  tailSpace: /^\s*|\s*$/,

  // ip地址
  ip: /\d+\.\d+\.\d+\.\d+/,
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,

  // 匹配空白行的正则表达式
  spaceLine: /\n\s*\r/,

  //匹配中国邮政编码
  postCode: /[1-9]\d{5}(?!\d)/,

  //sql 语句
  sql: /^(select|drop|delete|create|update|insert).*$/,

  hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,

  hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,

  url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,

}
