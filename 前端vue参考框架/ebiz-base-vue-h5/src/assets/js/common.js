/**
 * @desc 扩展对象继承
 * @param  {Object} out 一个或多个对象
 * @return {Object} 对象
 */
Object.extend = function(out) {
  out = out || {}
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key]
    }
  }
  return out
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(format) {
  let args = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length))
  }
  return format
}

export default {
  /**
   * @desc  判断对象是否为空
   * @param  {Object} o 对象
   * @return {Boolean}
   */
  isEmptyObject(o = {}) {
    let flag = true
    for (let k in o) {
      if (k) {
        flag = false
        break
      }
    }
    return flag
  },

  /**
   * @description 去除前后空格
   * @param  {String} 值
   * @return {String}
   */
  trim(val) {
    return val.replace(/(^\s*)|(\s*$)/g, '')
  },

  /**
   * @desc  获取 cookie
   * @param  {String}
   * @return {*}
   */
  getCookie(name) {
    let rs = ''
    var nameStr = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(nameStr) != -1) {
        rs = this._string2json(c.substring(nameStr.length, c.length))
      }
    }
    return rs
  },

  /**
   * @desc  设置 cookie
   * @param {String} name 名称
   * @param {*} value 值
   * @param {Number} hours 时长
   */
  setCookie(name, value, hours) {
    let str = name + '=' + this._json2string(value)
    if (hours && hours > 0) {
      var date = new Date()
      date.setTime(date.getTime() + hours * 3600 * 1000)
      str += '; expires=' + date.toUTCString()
    }
    document.cookie = str
  },

  /**
   * @desc  清除 cookie
   * @param  {String} 名称
   */
  delCookie(name) {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    document.cookie = name + '=a; expires=' + date.toGMTString()
  },

  /**
   * @desc  获取 localStorage 中指定的变量
   * @param  {String} name 名称
   * @return {*} rs
   */
  getStorage(name) {
    return this._string2json(window.localStorage[name])
  },

  /**
   * @desc  设置或添加 localStorage 中指定的变量
   * @param {String} name 名称
   */
  setStorage(name, value) {
    window.localStorage[name] = this._json2string(value)
  },

  /**
   * @desc  删除 localStorage 中指定的变量
   * @param  {String} name 名称
   */
  delStorage(name) {
    window.localStorage.removeItem(name)
  },

  /**
   * @desc json转string
   * @param  {*} value 值
   * @return {*} value 值
   */
  _json2string(value) {
    return JSON.stringify(value)
  },
  /**
   * @desc  string转json
   * @param  {*} value 值
   * @return {*} value 值
   */
  _string2json(value) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      //console.log(e)
    }
    return value
  },
  /**
   *@desc 只能输入单词字符
   *@param { String } value
   */
  character(value) {
    if (value) {
      value = value.replace(/[^A-Za-z0-9]/g, '')
    }
    return value
  },
  // 保留小数位，替代Number.toFixed()方法，针对于某些数据（16.455）不能做到四舍五入
  toFixed(value, num = 0) {
    let pos = value.toString().indexOf('.')
    let decimalPlaces = value.toString().length - pos - 1
    let intValue = value * Math.pow(10, decimalPlaces)
    let divisor1 = Math.pow(10, decimalPlaces - num)
    let divisor2 = Math.pow(10, num)
    return Math.round(intValue / divisor1) / divisor2
  },

  /**
   * 如果是小数则保留小数位，默认两位
   * @param  {[type]} value [description]
   * @param  {Number} num   [description]
   * @return {[type]}       [description]
   */
  toFloatFixed(value, num = 2) {
    let values = Number(value)
    if (values) {
      if (/^\d+\.\d+/.test(values)) {
        return this.toFixed(values, num)
      } else {
        return this.toFixed(values)
      }
    }
    return value
  },
  /**
   * 获取设备类型
   */
  device() {
    let ua = navigator.userAgent
    return {
      isChrome: ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      isAndroid: ua.match(/(Android);?[\s/]+([\d.]+)?/),
      isIphone: ua.indexOf('iPhone') != -1,
      isWeixin: ua.match(/MicroMessenger/i)
      //isTraining: ua.match(/training/i) //当前app标识，按照项目来定
    }
  },

  /**
   * 设置title
   */
  setTitle(title) {
    let device = this.device()
    if (device.isIphone && device.isWeixin) {
      document.title = title
      var i = document.createElement('iframe')
      i.src = '/favicon.ico'
      i.style.display = 'none'
      i.onload = function() {
        setTimeout(function() {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    } else {
      document.title = title
    }
  },

  // 字符省略
  ellipsis(value = '', num = -1) {
    if (value) {
      let str = ''
      if (num > 0 && value.length > num) {
        str = '...'
      }
      return value.slice(0, num) + str
    }
    return value
  },
  /**
   * 替换字符串具体位置字符
   * @param  {String}  str  目标字符串
   * @param  {String} char  字符
   * @param  {Number} start 数组开始索引
   * @param  {Number} end   数组结束索引
   * @return {[type]}       [description]
   */
  replaceChar(str = '', char = '*', start = 0, end) {
    let list = []
    if (str) {
      list = str.split('')
      let len = list.length
      start = start > 0 ? (start <= len ? start : len) : 0
      end = end ? (end > start ? end : start) : len
      for (let i = 0; i < len; i++) {
        if (i >= start && i < end) {
          list[i] = char
        }
      }
    }
    return list.join('')
  },
  /**
   * @desc：只能输入整数
   * @param
      value 操作数值
      max 最大值
    **/
  intOnly(value, max = Infinity, min = 0) {
    if (value) {
      let regular0 = /^0{1,}$/
      if (regular0.test(value)) {
        // 如果输入1个0以上，去除掉
        value = value.replace(/^0{1,}$/, '')
      }
      if (/[^0-9]*$/.test(value)) {
        value = value.replace(/\D/g, '')
      } else {
        if (value > max) value = value.substr(0, value.length - 1)
        if (value < min) value = min
      }
    }
    return value
  },
  // 数组去重
  unrepeat(arr) {
    if (arr instanceof Array) {
      let hash = {}
      let rsArr = []
      let len = arr.length
      // eslint-disable-next-line no-unused-vars
      let type = ''
      for (let i = 0; i < len; i++) {
        if (typeof arr[i] == 'string') {
          type = 'string'
        }
        if (!hash[arr[i]]) {
          hash[arr[i]] = arr[i]
          rsArr.push(arr[i])
        }
      }
      return rsArr
    }
  },
  // 一层对象数组去重
  unrepeatObj(arr, key) {
    if (arr instanceof Array) {
      let hash = {}
      let rsArr = []
      let len = arr.length
      // eslint-disable-next-line no-unused-vars
      let type = ''
      for (let i = 0; i < len; i++) {
        if (typeof arr[i] == 'string') {
          type = 'string'
        }
        if (!hash[arr[i][key]]) {
          hash[arr[i][key]] = arr[i]
          rsArr.push(arr[i])
        }
      }
      return rsArr
    }
  },
  //距离转换
  m2km(value) {
    if (value < 1000) return value + 'm'
    else if (value >= 1000 && value <= 20000) return (value / 1000).toFixed(1) + 'km'
    else if (value >= 2000) return '>20km'
    return value
  },
  /**
   * 获取App信息
   */
  detectApp() {
    var ua = navigator.userAgent
    //RegExp.$1; RegExp.$2; RegExp.$3;
    //var info = ua.match(/(CarmeApp)\s*[v]*(\d+\.\d+\.\d+)\s*\/\s*(IOS|Android)/i)
    ua.match(/(CarmeApp)\s*[v]*(\d+\.\d+\.\d+)\s*\/\s*(IOS|Android)/i)
    return {
      appName: RegExp.$1,
      appVersion: RegExp.$2,
      appOS: RegExp.$3
    }
  }
}
